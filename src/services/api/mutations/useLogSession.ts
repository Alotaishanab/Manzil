// src/services/logSession.ts

import api from '../api'; // Adjusted import path
import { apiUrls } from '../../urls';

type StartSessionResponse = {
  message: string;
  session_id: string;
  start_time: string;
};

type EndSessionResponse = {
  message: string;
  session_id: string;
  duration_seconds: number;
  end_time: string;
};

/**
 * Starts a user session by sending the guest ID to the backend.
 * @param {string | undefined} guestId - The guest ID, if the user is not authenticated.
 * @returns {Promise<StartSessionResponse>} The response from the backend.
 */
export const logSessionStart = async (
  guestId?: string
): Promise<StartSessionResponse> => {
  try {
    console.log('Starting session with guest_id:', guestId);
    const response = await api.post<StartSessionResponse>(apiUrls.startSession, {
      guest_id: guestId,
    });
    console.log('Response:', response);

    if (response && response.session_id) {
      console.log('Session started successfully:', response);
      return response;
    } else {
      console.error('Invalid response data:', response);
      throw new Error('Invalid response data');
    }
  } catch (error: any) {
    console.error('Failed to start session:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

/**
 * Ends a user session by sending the session ID to the backend.
 * @param {string} sessionId - The session ID to end.
 * @returns {Promise<EndSessionResponse>} The response from the backend.
 */
export const logSessionEnd = async (
  sessionId: string
): Promise<EndSessionResponse> => {
  try {
    console.log('Ending session with session_id:', sessionId);

    // Use POST instead of DELETE based on backend expectations
    const response = await api.post<EndSessionResponse>(apiUrls.endSession, {
      session_id: sessionId,
    });
    console.log('Session ended successfully:', response);
    return response;
  } catch (error: any) {
    console.error('Failed to end session:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};
