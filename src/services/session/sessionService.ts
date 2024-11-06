// services/session/sessionService.ts

import api from '../api/api';
import { apiUrls } from '../utils/urls';
import AsyncHelper from '../../helpers/asyncHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Interface for session start payload.
 */
interface SessionStartPayload {
  guest_id?: string | null;
  user_id?: string | null;
}

/**
 * Interface for session start response.
 */
interface SessionStartResponse {
  message: string;
  session_id: string;
  start_time: string;
}

/**
 * Initiates a new session (guest or user).
 * @param payload - The session start payload containing either guest_id or user_id.
 * @returns The session_id if successful, otherwise null.
 */
export const logSessionStartService = async (
  payload: SessionStartPayload
): Promise<string | null> => {
  try {
    const response = await api.post<SessionStartResponse>(
      apiUrls.startSession,
      payload,
      { headers: { sendAuthToken: false } } // Do not send auth token for session start
    );
    console.log('logSessionStartService response:', response.data); // Log only the data part

    // Return the session_id directly
    return response.data.session_id;
  } catch (error) {
    console.error('Failed to start session:', error);
    return null;
  }
};

/**
 * Sends a heartbeat to keep the session active.
 * @param sessionId - The current session ID.
 * @param guestId - The guest ID if the session is for a guest.
 * @param userId - The user ID if the session is for a logged-in user.
 */
export const sendHeartbeat = async (
  sessionId: string,
  guestId?: string | null,
  userId?: string | null
) => {
  try {
    const accessToken = await AsyncHelper.getToken(); // Retrieve the access token
    const storedUserId = userId || (await AsyncHelper.getUserId()); // Retrieve userId if not provided

    // Prepare the payload based on session type
    const payload: any = { session_id: sessionId };
    if (storedUserId) {
      payload.user_id = storedUserId;
    } else if (guestId) {
      payload.guest_id = guestId;
    }

    // Log the relevant details with proper template strings
    console.log(
      `Sending heartbeat for ${storedUserId ? 'User' : 'Guest'} session, ID: ${sessionId}`
    );
    console.log(
      'Heartbeat payload details:',
      storedUserId ? `User ID: ${storedUserId}` : `Guest ID: ${guestId}`
    );
    console.log('Auth Token:', accessToken ? '[Token Present]' : '[No Token]');
    console.log('Heartbeat payload:', JSON.stringify(payload, null, 2));

    // Determine whether to send the Authorization token
    const sendAuthToken = !!storedUserId && !!accessToken;

    // Ensure the endpoint URL ends with a trailing slash
    const heartbeatUrl = apiUrls.sessionHeartbeat.endsWith('/')
      ? apiUrls.sessionHeartbeat
      : `${apiUrls.sessionHeartbeat}/`;

    // Send heartbeat with appropriate Authorization header handled by interceptors
    const response = await api.post(
      heartbeatUrl,
      payload,
      { headers: { sendAuthToken } }
    );

    console.log('Heartbeat response:', response.data); // Log only the data part
  } catch (error) {
    console.error('Failed to send heartbeat:', error);
    throw error;
  }
};

/**
 * Logs out the user by ending the session and clearing session data.
 */
export const performLogout = async (): Promise<void> => {
  try {
    // Retrieve user session ID
    const userSessionId = await AsyncStorage.getItem('user_session');
    if (userSessionId) {
      // End user session on the backend
      await api.post(
        apiUrls.endSession,
        { session_id: userSessionId },
        { headers: { sendAuthToken: true } }
      );
      console.log('User session ended on the backend.');
    }

    // Clear session data on the frontend
    await AsyncStorage.removeItem('user_session');
    await AsyncStorage.removeItem('guest_session');
    await AsyncHelper.removeToken();
    await AsyncHelper.removeRefreshToken();
    await AsyncHelper.removeUserId();
    await AsyncHelper.removeGuestId();

    console.log('User logged out and session data cleared on the frontend.');
  } catch (error) {
    console.error('Failed to logout:', error);
    throw error; // Propagate the error for upstream handling
  }
};
