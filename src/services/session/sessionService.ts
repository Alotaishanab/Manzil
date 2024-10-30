// services/session/sessionService.ts

import api from '../api/api';
import { apiUrls } from '../utils/urls'; // Adjusted import path if necessary
import AsyncHelper from '../../helpers/asyncHelper'; // Correct default import

// Updated interface to include user_id
interface SessionStartPayload {
  guest_id?: string | null;
  user_id?: string | null;
}

interface SessionStartResponse {
  message: string;
  session_id: string;
  start_time: string;
}

export const logSessionStartService = async (
  payload: SessionStartPayload
): Promise<{ session_id: string } | null> => {
  try {
    const response = await api.post<SessionStartResponse>(
      apiUrls.startSession,
      payload,
      false // sendAuthToken: false when initiating session
    );
    console.log('logSessionStartService response:', response); // Log entire response
    return { session_id: response.session_id };
  } catch (error) {
    console.error('Failed to start session:', error);
    return null;
  }
};

/**
 * Sends a heartbeat to keep the session active.
 * @param {string} sessionId - The current session ID.
 * @param {string} [guestId] - The guest ID if the session is for a guest.
 * @param {string} [userId] - The user ID if the session is for a logged-in user.
 */
export const sendHeartbeat = async (sessionId: string, guestId?: string | null, userId?: string | null) => {
  try {
    const accessToken = await AsyncHelper.getToken(); // Retrieve the access token
    const storedUserId = userId || await AsyncHelper.getUserId(); // Retrieve userId if not provided

    // Prepare the payload based on session type
    const payload: any = { session_id: sessionId };
    if (storedUserId) {
      payload.user_id = storedUserId;
    } else if (guestId) {
      payload.guest_id = guestId;
    }

    // Log the relevant details
    console.log(`Sending heartbeat for ${storedUserId ? 'User' : 'Guest'} session, ID: ${sessionId}`);
    console.log('Heartbeat payload details:', storedUserId ? `User ID: ${storedUserId}` : `Guest ID: ${guestId}`);
    console.log('Auth Token:', accessToken ? '[Token Present]' : '[No Token]');
    console.log('Heartbeat payload:', payload);

    // Determine whether to send the Authorization token
    const sendAuthToken = !!accessToken;

    // Send heartbeat with appropriate Authorization header handled by interceptors
    const response = await api.post(apiUrls.sessionHeartbeat, payload, sendAuthToken);

    console.log('Heartbeat response:', response); // Log entire response
  } catch (error) {
    console.error('Failed to send heartbeat:', error);
    throw error;
  }
};
