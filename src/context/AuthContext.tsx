// src/context/AuthContext.tsx
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncHelper from '../helpers/asyncHelper';
import LoggingWebSocketManager from '../services/websocket/LoggingWebSocketManager';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  guestId: string | null;
  setAuthToken: (token: string) => Promise<void>;
  setAuthUserId: (userId: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  initializeGuestId: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  userId: null,
  guestId: null,
  setAuthToken: async () => {},
  setAuthUserId: async () => {},
  clearAuth: async () => {},
  initializeGuestId: async () => {},
});

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserIdState] = useState<string | null>(null);
  const [guestId, setGuestIdState] = useState<string | null>(null);

  // Update WebSocket connection whenever auth state changes
  useEffect(() => {
    // Update WebSocket connection based on the auth state
    if (token) {
      // If token exists, pass token to WebSocket manager
      LoggingWebSocketManager.updateAuthState(token, null); // No guestId for authenticated users
    } else if (guestId) {
      // If guestId exists, pass guestId to WebSocket manager
      LoggingWebSocketManager.updateAuthState(null, guestId); // No token for guest users
    }
  }, [token, guestId]);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const [storedToken, storedUserId, storedGuestId] = await Promise.all([
          AsyncHelper.getToken(),
          AsyncHelper.getUserId(),
          AsyncHelper.getGuestId(),
        ]);

        console.log(`Stored token in AuthProvider is ${storedToken}`);

        if (storedToken) {
          setTokenState(storedToken);
        }
        if (storedUserId) {
          setUserIdState(storedUserId);
        }
        if (storedGuestId) {
          setGuestIdState(storedGuestId);
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
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

  const initializeGuestId = async () => {
    const guestId = await AsyncHelper.getGuestId();
    setGuestIdState(guestId);
  };

  const clearAuth = async () => {
    await AsyncHelper.removeToken();
    await AsyncHelper.removeUserId();
    await AsyncHelper.removeGuestId();
    setTokenState(null);
    setUserIdState(null);
    setGuestIdState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        guestId,
        setAuthToken,
        setAuthUserId,
        clearAuth,
        initializeGuestId,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
