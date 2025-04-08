import React, { useEffect, useRef, useContext } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { api } from '@services';
import { apiUrls } from '../services/utils/urls';

const HEARTBEAT_INTERVAL = 60 * 1000;
const GUEST_SESSION_KEY = 'guest_session';
const USER_SESSION_KEY = 'user_session';

export default function useSessionManager() {
  const {
    token,
    userId,
    guestId,
    loadingAuth,
    initializeGuestId,
    clearAuth,
    clearGuestId,
  } = useContext(AuthContext);

  // We'll store sessionId + isUserSession in refs
  const sessionIdRef = useRef<string | null>(null);
  const isUserSessionRef = useRef<boolean>(false);

  const appState = useRef(AppState.currentState);
  const heartbeatTimer = useRef<NodeJS.Timeout | null>(null);

  // -----------------------------------------------------------
  // Getters
  // -----------------------------------------------------------
  const getSessionId = () => sessionIdRef.current;
  const getIsUserSession = () => isUserSessionRef.current;

  // -----------------------------------------------------------
  // A) ensureSession
  // -----------------------------------------------------------
  const ensureSession = async () => {
    if (token && userId) {
      console.log('=> Using user session branch');
      const userSessionId = await getOrCreateUserSession();
      if (userSessionId) {
        sessionIdRef.current = userSessionId;
        isUserSessionRef.current = true;
        startHeartbeat();
      }
    } else {
      console.log('=> Using guest session branch');
      const guestSessionId = await getOrCreateGuestSession();
      if (guestSessionId) {
        sessionIdRef.current = guestSessionId;
        isUserSessionRef.current = false;
        startHeartbeat();
      }
    }
  };

  // user session
  const getOrCreateUserSession = async (): Promise<string | null> => {
    if (!userId) {
      console.warn('Cannot create user session - missing userId');
      return null;
    }
    // remove old guest session from storage
    await AsyncStorage.removeItem(GUEST_SESSION_KEY);

    // check existing user session
    const existing = await AsyncStorage.getItem(USER_SESSION_KEY);
    if (existing) {
      console.log('Reusing existing user session:', existing);
      return existing;
    }
    // else create new
    const newSessionId = await startSessionOnServer({ user_id: userId });
    if (newSessionId) {
      await AsyncStorage.setItem(USER_SESSION_KEY, newSessionId);
      return newSessionId;
    }
    return null;
  };

  // guest session
  const getOrCreateGuestSession = async (): Promise<string | null> => {
    let currentGuestId = guestId;
    if (!currentGuestId) {
      console.log('No guestId found. Initializing...');
      currentGuestId = await initializeGuestId();
      if (!currentGuestId) {
        console.error('Failed to initialize guest ID.');
        return null;
      }
    }
    const existingGuestSession = await AsyncStorage.getItem(GUEST_SESSION_KEY);
    if (existingGuestSession) {
      console.log('Reusing existing guest session:', existingGuestSession);
      // We *could* do an immediate heartbeat or validation call to see if that old
      // session still exists on the server. If it fails with 404, we remove it and create a new one.
      return existingGuestSession;
    }
    const newSessionId = await startSessionOnServer({ guest_id: currentGuestId });
    if (newSessionId) {
      await AsyncStorage.setItem(GUEST_SESSION_KEY, newSessionId);
      return newSessionId;
    }
    return null;
  };

  // create session on server
  const startSessionOnServer = async (payload: { guest_id?: string; user_id?: string }) => {
    try {
      const response = await api.post(apiUrls.startSession, payload, false);
      console.log('startSessionOnServer response:', response);
      if (response?.session_id) {
        console.log('Started session with session_id:', response.session_id);
        return response.session_id;
      }
    } catch (err) {
      console.error('Error starting session:', err);
    }
    return null;
  };

  // -----------------------------------------------------------
  // B) Heartbeat logic
  // -----------------------------------------------------------
  const startHeartbeat = () => {
    stopHeartbeat();
    heartbeatTimer.current = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
    console.log('Heartbeat started.');
  };

  const stopHeartbeat = () => {
    if (heartbeatTimer.current) {
      clearInterval(heartbeatTimer.current);
      heartbeatTimer.current = null;
      console.log('Heartbeat stopped.');
    }
  };

  const sendHeartbeat = async () => {
    const sid = sessionIdRef.current;
    const isUsr = isUserSessionRef.current;
    console.log('sendHeartbeat() fired. sessionId=', sid, ' isUserSession=', isUsr);

    if (!sid) {
      console.log('No sessionId; skipping heartbeat.');
      return;
    }

    try {
      if (isUsr) {
        // user
        if (!token || !userId) {
          console.log('No valid token/userId for user session. Skipping heartbeat.');
          return;
        }
        console.log(`Sending heartbeat (user) for sessionId=${sid}`);
        await api.post(apiUrls.sessionHeartbeat, { session_id: sid, user_id: userId }, true);
      } else {
        // guest
        if (!guestId) {
          console.log('No guestId for guest session. Skipping heartbeat.');
          return;
        }
        console.log(`Sending heartbeat (guest) for sessionId=${sid}`);
        await api.post(
          apiUrls.sessionHeartbeat,
          { session_id: sid, guest_id: guestId },
          false
        );
      }
    } catch (err: any) {
      console.error('Error sending heartbeat:', err);

      // If the server 404s for "non-existent session ID," let's remove it & force a new one
      if (err?.response?.status === 404) {
        console.log('Received 404 => removing stale session and forcing new guest session...');
        // forcibly clear
        stopHeartbeat();
        sessionIdRef.current = null;

        // remove old session from storage
        if (isUsr) {
          await AsyncStorage.removeItem(USER_SESSION_KEY);
        } else {
          await AsyncStorage.removeItem(GUEST_SESSION_KEY);
        }

        // re-init to create a fresh session
        await ensureSession();
      }
    }
  };

  // -----------------------------------------------------------
  // C) Foreground => ensureSession
  // -----------------------------------------------------------
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App moved to foreground -> ensure session');
        ensureSession();
      }
      appState.current = nextAppState;
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      stopHeartbeat();
    };
  }, []);

  // -----------------------------------------------------------
  // D) Wait for Auth to load
  // -----------------------------------------------------------
  useEffect(() => {
    if (!loadingAuth) {
      console.log('AuthContext loaded. Checking session...');
      ensureSession();
    }
  }, [loadingAuth]);

  // -----------------------------------------------------------
  // E) endSessionAndRevertToGuest
  // -----------------------------------------------------------
  const endSessionAndRevertToGuest = async () => {
    console.log('endSessionAndRevertToGuest -> removing user session...');
    await AsyncStorage.removeItem(USER_SESSION_KEY);
    await clearAuth();

    stopHeartbeat();
    sessionIdRef.current = null;
    isUserSessionRef.current = false;

    // Also remove old guest session + ID so we get a brand-new one
    await AsyncStorage.removeItem(GUEST_SESSION_KEY);
    await clearGuestId();

    console.log('Re-initializing as guest...');
    await ensureSession();
  };

  // forcibly kill old session (guest or user) w/o removing user tokens
  const stopAndClearSession = async () => {
    stopHeartbeat();
    sessionIdRef.current = null;
    isUserSessionRef.current = false;
  };

  return {
    getSessionId,
    getIsUserSession,
    ensureSession,
    stopAndClearSession,
    endSessionAndRevertToGuest,
  };
}
