import apiInstance from '../api';
import { BASE_URL } from '../../utils/urls';

export const usepinConversation = async (partnerId: number, token: string) => {
  const response = await apiInstance.post(
    `${BASE_URL}/messaging/conversations/${partnerId}/pin/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};