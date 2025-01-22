import apiInstance from '../api';
import { BASE_URL } from '../../utils/urls';

export const usehideChat = async (partnerId: number, token: string) => {
  try {
    await apiInstance.delete(
      `${BASE_URL}/messaging/chats/${partnerId}/hide_for_user/`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Error hiding conversation:', error);
    throw error;
  }
};