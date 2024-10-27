// src/hooks/useSessionTracker.ts

import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { logSessionStart, sendHeartbeat } from '@services';
import AsyncHelper from '../helpers/asyncHelper';
import { getGuestId } from '../helpers/guestHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'active_session';
const HEARTBEAT_INTERVAL = 2 * 60 * 1000; // 2 minutes in milliseconds

const useSessionTracker = () => {
  const appState = useRef(AppState.currentState);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      try {
        console.log('AppState changed from', appState.current, 'to', nextAppState);

        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          // App has come to the foreground
          await startSession();
        } else if (
          appState.current === 'active' &&
          nextAppState.match(/inactive|background/)
        ) {
          // App is going to the background
          stopHeartbeat();
          // No need to explicitly end the session
        }
      } catch (error) {
        console.error('Error handling app state change:', error);
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Initialize session tracking on mount
    startSession();

    return () => {
      subscription.remove();
      stopHeartbeat();
    };
  }, []);

  const startSession = async () => {
    try {
      const isAuthenticated = !!(await AsyncHelper.getToken());
      const guestId = isAuthenticated ? undefined : await getGuestId();

      console.log('Starting session with guest_id:', guestId);
      const response = await logSessionStart(guestId);

      if (response && response.session_id) {
        console.log('Session started with session_id:', response.session_id);
        await AsyncStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ sessionId: response.session_id, isAuthenticated })
        );
        startHeartbeat(response.session_id);
      } else {
        console.error('No session_id returned from logSessionStart');
      }
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const startHeartbeat = (sessionId: string) => {
    stopHeartbeat(); // Ensure no existing heartbeat is running
    console.log('Starting heartbeat for session_id:', sessionId);

    heartbeatIntervalRef.current = setInterval(async () => {
      try {
        console.log('Sending heartbeat for session_id:', sessionId);
        await sendHeartbeat(sessionId);
      } catch (error) {
        console.error('Failed to send heartbeat:', error);
      }
    }, HEARTBEAT_INTERVAL);
  };

  const stopHeartbeat = () => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
      console.log('Heartbeat stopped');
    }
  };
};

export default useSessionTracker;
