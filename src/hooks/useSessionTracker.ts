// hooks/useSessionTracker.ts

import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { logSessionStartService, sendHeartbeat } from '../services/session/sessionService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncHelper from '../helpers/asyncHelper';

const GUEST_SESSION_KEY = 'guest_session';
const USER_SESSION_KEY = 'user_session';
const HEARTBEAT_INTERVAL = 0.1 * 60 * 1000; // 1 minute in milliseconds

const useSessionTracker = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      try {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground. Starting session.');
          await startSessionHandler();
        } else if (
          appState.current === 'active' &&
          nextAppState.match(/inactive|background/)
        ) {
          console.log('App is going to the background. Stopping heartbeat.');
          stopHeartbeat();
        }
      } catch (error) {
        console.error('Error handling app state change:', error);
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    startSessionHandler(); // Start session on initial load

    return () => {
      subscription.remove();
      stopHeartbeat();
    };
  }, []);

  const startSessionHandler = async () => {
    try {
      const isAuthenticated = await AsyncHelper.isAuthenticated();

      if (isAuthenticated) {
        const existingUserSessionId = await AsyncStorage.getItem(
          USER_SESSION_KEY
        );
        if (existingUserSessionId) {
          console.log(
            `Existing user session found with ID: ${existingUserSessionId}. No new session created.`
          );
          const userId = await AsyncHelper.getUserId();
          startHeartbeat(existingUserSessionId, null, userId);
          return;
        }

        const userId = await AsyncHelper.getUserId();
        const sessionId = await logSessionStartService({ user_id: userId });
        if (sessionId) {
          console.log(`User session started with session_id: ${sessionId}`);
          await AsyncStorage.setItem(USER_SESSION_KEY, sessionId);
          // Clear any existing guest session
          await AsyncStorage.removeItem(GUEST_SESSION_KEY);
          startHeartbeat(sessionId, null, userId);
        } else {
          console.error(
            'No session_id returned from logSessionStartService for user session'
          );
        }
      } else {
        const existingGuestSessionId = await AsyncStorage.getItem(
          GUEST_SESSION_KEY
        );
        if (existingGuestSessionId) {
          console.log(
            `Existing guest session found with ID: ${existingGuestSessionId}. No new session created.`
          );
          const guestId = await AsyncHelper.getGuestId();
          startHeartbeat(existingGuestSessionId, guestId, null);
          return;
        }

        const guestId = await AsyncHelper.getGuestId();
        const sessionId = await logSessionStartService({ guest_id: guestId });
        if (sessionId) {
          console.log(`Guest session started with session_id: ${sessionId}`);
          await AsyncStorage.setItem(GUEST_SESSION_KEY, sessionId);
          startHeartbeat(sessionId, guestId, null);
        } else {
          console.error(
            'No session_id returned from logSessionStartService for guest session'
          );
        }
      }
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const startHeartbeat = (
    sessionId: string,
    guestId: string | null,
    userId: string | null
  ) => {
    stopHeartbeat();
    heartbeatIntervalRef.current = setInterval(async () => {
      try {
        let currentSessionId = '';
        let currentGuestId: string | null = null;
        let currentUserId: string | null = null;

        if (userId) {
          currentSessionId =
            (await AsyncStorage.getItem(USER_SESSION_KEY)) || '';
          currentUserId = userId;
        } else {
          currentSessionId =
            (await AsyncStorage.getItem(GUEST_SESSION_KEY)) || '';
          currentGuestId = guestId;
        }

        if (currentSessionId === sessionId) {
          console.log(
            `Sending heartbeat for ${userId ? 'User' : 'Guest'} session, ID: ${sessionId}`
          );
          console.log(
            `Heartbeat payload details: ${
              userId ? `User ID: ${userId}` : `Guest ID: ${guestId}`
            }`
          );
          await sendHeartbeat(sessionId, currentGuestId, currentUserId);
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
