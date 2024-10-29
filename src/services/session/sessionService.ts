// services/session/sessionService.ts

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
    const guestId = !isAuthenticated ? await AsyncHelper.getGuestId() : undefined;

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
 */
export const sendHeartbeat = async (sessionId: string): Promise<void> => {
  try {
    const isAuthenticated = await AsyncHelper.isAuthenticated();
    const userId = isAuthenticated ? await AsyncHelper.getUserId() : null;
    const guestId = !isAuthenticated ? await AsyncHelper.getGuestId() : null;

    const payload = {
      session_id: sessionId,
      ...(userId ? { user_id: userId } : { guest_id: guestId }),
    };

    await api.post(apiUrls.sessionHeartbeat, payload, false);
    console.log("Heartbeat sent successfully for session:", sessionId);
  } catch (error) {
    console.error("Failed to send heartbeat:", error);
    throw error;
  }
};
