// hooks/useSessionTracker.ts

import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { logSessionStartService, sendHeartbeat } from '../services/session/sessionService';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const response = await logSessionStartService();
      if (response && response.session_id) {
        console.log('Session started with session_id:', response.session_id);
        await AsyncStorage.setItem(SESSION_KEY, response.session_id);
        startHeartbeat(response.session_id);
      } else {
        console.error('No session_id returned from logSessionStartService');
      }
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const startHeartbeat = (sessionId: string) => {
    stopHeartbeat(); // Clear any existing interval
    heartbeatIntervalRef.current = setInterval(() => {
      sendHeartbeat(sessionId).catch((error) => console.error('Failed to send heartbeat:', error));
    }, HEARTBEAT_INTERVAL);
  };

  const stopHeartbeat = () => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
  };

  return { startSessionHandler };
};

export default useSessionTracker;
