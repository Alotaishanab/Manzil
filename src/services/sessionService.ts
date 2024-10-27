// src/services/sessionService.ts

import api from './api';
import { apiUrls } from './urls';

/**
 * Sends a heartbeat to the server to indicate the session is active.
 * @param {string} sessionId - The current session ID.
 * @returns {Promise<void>}
 */
export const sendHeartbeat = async (sessionId: string): Promise<void> => {
  try {
    const response = await api.post(apiUrls.sessionHeartbeat, { session_id: sessionId });
    console.log('Heartbeat sent successfully:', response.data);
  } catch (error: any) {
    console.error('Failed to send heartbeat:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};
