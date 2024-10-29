import api from '../api/api';
import { apiUrls } from '../utils/urls';
import AsyncHelper from '../../helpers/asyncHelper';

/**
 * Starts a user session, checking if user is authenticated or guest.
 * @returns {Promise<{ session_id: string } | null>}
 */
export const logSessionStartService = async (): Promise<{ session_id: string } | null> => {
  try {
    const isAuthenticated = await AsyncHelper.isAuthenticated();
    const guestId = !isAuthenticated ? await AsyncHelper.getGuestId() || await AsyncHelper.generateGuestId() : undefined;

    const payload = guestId ? { guest_id: guestId } : {};
    const response = await api.post<{ session_id: string }>(apiUrls.startSession, payload, false);
    return response;
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
    const payload = {
      session_id: sessionId,
      ...(userId ? { user_id: userId } : { guest_id: guestId }),
    };

    console.log(`Sending heartbeat with payload:`, payload);
    const response = await api.post('/account/user/session-heartbeat/', payload);
    console.log('Heartbeat response:', response);
  } catch (error) {
    console.error('Failed to send heartbeat:', error);
    throw error;
  }
};
