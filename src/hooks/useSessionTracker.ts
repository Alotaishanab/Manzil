// hooks/useSessionTracker.ts

import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { logSessionStartService, sendHeartbeat } from '../services/session/sessionService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncHelper from '../helpers/asyncHelper';

const SESSION_KEY = 'active_session';
const HEARTBEAT_INTERVAL = 0.2 * 60 * 1000; // 2 minutes in milliseconds

const useSessionTracker = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      try {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground. Starting session.');
          await startSessionHandler();
        } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
          console.log('App is going to the background. Stopping heartbeat.');
          stopHeartbeat();
        }
      } catch (error) {
        console.error('Error handling app state change:', error);
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    startSessionHandler(); // Start session on initial load

    return () => {
      subscription.remove();
      stopHeartbeat();
    };
  }, []);

  const startSessionHandler = async () => {
    try {
      const existingSessionId = await AsyncStorage.getItem(SESSION_KEY);
      if (existingSessionId) {
        console.log(`Existing session found with ID: ${existingSessionId}. No new session created.`);
        startHeartbeat(existingSessionId, null, await AsyncHelper.getUserId());
        return;
      }

      const isAuthenticated = await AsyncHelper.isAuthenticated();
      const sessionType = isAuthenticated ? 'User' : 'Guest';
      const userId = isAuthenticated ? await AsyncHelper.getUserId() : null;
      const guestId = !isAuthenticated ? (await AsyncHelper.getGuestId()) || (await AsyncHelper.generateGuestId()) : null;

      console.log(`Session Type: ${sessionType}, User ID: ${userId}, Guest ID: ${guestId}`);

      const payload: any = {};
      if (isAuthenticated && userId) {
        payload.user_id = userId;
      } else if (guestId) {
        payload.guest_id = guestId;
      }

      const response = await logSessionStartService(payload);
      if (response && response.session_id) {
        console.log(`Session started as ${sessionType} with session_id: ${response.session_id}`);
        await AsyncStorage.setItem(SESSION_KEY, response.session_id);
        startHeartbeat(response.session_id, guestId, userId); // Pass userId
      } else {
        console.error('No session_id returned from logSessionStartService');
      }
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const startHeartbeat = (sessionId: string, guestId: string | null, userId: string | null) => {
    stopHeartbeat();
    heartbeatIntervalRef.current = setInterval(async () => {
      try {
        const storedSessionId = await AsyncStorage.getItem(SESSION_KEY);
        if (storedSessionId === sessionId) {
          console.log(`Sending heartbeat for session, ID: ${sessionId}`);
          console.log(`Heartbeat payload details: ${userId ? `User ID: ${userId}` : `Guest ID: ${guestId}`}`);
          await sendHeartbeat(sessionId, guestId, userId); // Pass userId
        } else {
          console.warn('Heartbeat canceled, session ID mismatch or missing.');
          stopHeartbeat();
        }
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

  return { startSessionHandler };
};

export default useSessionTracker;
