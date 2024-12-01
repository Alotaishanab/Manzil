// src/context/WebSocketContext.tsx

import React, {createContext, useContext, useEffect} from 'react';
import {AuthContext} from './AuthContext';
import MessagingWebSocketManager from '../services/websocket/MessagingWebSocketManager';
import LoggingWebSocketManager from '../services/websocket/LoggingWebSocketManager';

interface WebSocketContextProps {
  messagingManager: typeof MessagingWebSocketManager;
  loggingManager: typeof LoggingWebSocketManager;
}

export const WebSocketContext = createContext<WebSocketContextProps>({
  messagingManager: MessagingWebSocketManager,
  loggingManager: LoggingWebSocketManager,
});

export const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {token} = useContext(AuthContext); // Assuming 'token' is provided by AuthContext

  console.log(`WebSocketProvider -- Token in AuthContext is ${token}.`);

  useEffect(() => {
    MessagingWebSocketManager.setToken(token);
    LoggingWebSocketManager.setToken(token);
  }, [token]);

  return (
    <WebSocketContext.Provider
      value={{
        messagingManager: MessagingWebSocketManager,
        loggingManager: LoggingWebSocketManager,
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};
