// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncHelper from '../helpers/asyncHelper';
import LoggingWebSocketManager from '../services/websocket/LoggingWebSocketManager';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  guestId: string | null;
  loadingAuth: boolean;
  setAuthToken: (token: string) => Promise<void>;
  setAuthUserId: (userId: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  clearGuestId: () => Promise<void>;
  initializeGuestId: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  userId: null,
  guestId: null,
  loadingAuth: true,
  setAuthToken: async () => {},
  setAuthUserId: async () => {},
  clearAuth: async () => {},
  clearGuestId: async () => {},
  initializeGuestId: async () => null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserIdState] = useState<string | null>(null);
  const [guestId, setGuestIdState] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Update WebSocket credentials whenever token or guestId changes
    if (token) {
      LoggingWebSocketManager.updateAuthState(token, null);
    } else if (guestId) {
      LoggingWebSocketManager.updateAuthState(null, guestId);
    }
  }, [token, guestId]);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncHelper.getToken();
        const storedUserId = await AsyncHelper.getUserId();

        // Only generate or retrieve a guest ID if we have no token
        let storedGuestId: string | null = null;
        if (!storedToken) {
          // no token => generate or retrieve guest ID
          storedGuestId = await AsyncHelper.getGuestId(true);
        } else {
          // have a token => only retrieve existing guest ID if it’s in Keychain/AsyncStorage
          storedGuestId = await AsyncHelper.getGuestId(false);
        }

        console.log(`Stored token in AuthProvider is ${storedToken}`);

        if (storedToken) setTokenState(storedToken);
        if (storedUserId) setUserIdState(storedUserId);
        if (storedGuestId) setGuestIdState(storedGuestId);
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setLoadingAuth(false);
        console.log('AuthContext: loadingAuth set to false');
      }
    };
    loadAuth();
  }, []);

  const setAuthToken = async (newToken: string) => {
    await AsyncHelper.setToken(newToken);
    setTokenState(newToken);
  };

  const setAuthUserId = async (newUserId: string) => {
    await AsyncHelper.setUserId(newUserId);
    setUserIdState(newUserId);
  };

  const clearGuestId = async () => {
    await AsyncHelper.removeGuestId();
    setGuestIdState(null);
  };

  const initializeGuestId = async (): Promise<string | null> => {
    const newGuestId = await AsyncHelper.getGuestId(true);
    setGuestIdState(newGuestId);
    return newGuestId;
  };

  // Clear token & userId, keep guestId if you want
  const clearAuth = async () => {
    await AsyncHelper.removeToken();
    await AsyncHelper.removeUserId();
    setTokenState(null);
    setUserIdState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        guestId,
        loadingAuth,
        setAuthToken,
        setAuthUserId,
        clearAuth,
        clearGuestId,
        initializeGuestId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
