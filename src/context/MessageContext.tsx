// src/context/MessagesContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Message, fetchReceivedMessages, fetchSentMessages } from '@services';
import { useSendMessage } from '@services';
import { MessagingWebSocketManager } from '@services';
import { AsyncHelper } from '@helpers'; // Remove this import

interface MessagesContextProps {
  receivedMessages: Message[];
  sentMessages: Message[];
  sendMessage: (receiver_id: string, body: string) => Promise<void>;
}

export const MessagesContext = createContext<MessagesContextProps>({
  receivedMessages: [],
  sentMessages: [],
  sendMessage: async () => {},
});

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch initial messages
    const loadMessages = async () => {
      try {
        const token = await AsyncHelper.getToken(); // Remove this
        if (!token) {
          throw new Error('Authentication token not found');
        }
        const received = await fetchReceivedMessages(token);
        setReceivedMessages(received);
        const sent = await fetchSentMessages(token);
        setSentMessages(sent);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    loadMessages();

    // Listen for new messages via WebSocket
    const handleNewMessage = (message: Message) => {
      // Add to receivedMessages
      setReceivedMessages(prev => [message, ...prev]);
    };

    MessagingWebSocketManager.on('new_message', handleNewMessage);

    return () => {
      MessagingWebSocketManager.off('new_message', handleNewMessage);
    };
  }, []);

  const sendMessage = async (receiver_id: string, body: string) => {
    try {
      const token = await AsyncHelper.getToken(); // Remove this
      if (!token) {
        throw new Error('Authentication token not found');
      }
      // Send via API
      const newMessage = await useSendMessage({ receiver: receiver_id, body }, token);
      // Add to sentMessages state
      setSentMessages(prev => [newMessage, ...prev]);
      // Optionally, handle WebSocket broadcasting if necessary
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show notification to user)
    }
  };

  return (
    <MessagesContext.Provider value={{ receivedMessages, sentMessages, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};
