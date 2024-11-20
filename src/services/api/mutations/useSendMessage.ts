// src/services/api/mutations/sendMessage.ts

import axios from 'axios';
import { BASE_URL, apiUrls } from '../../utils/urls';

// Define the payload interface
export interface SendMessagePayload {
  receiver: string; // receiver's user_id
  body: string;
}

// Define the function without importing AsyncHelper
export const useSendMessage = async (
  payload: SendMessagePayload,
  token: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${apiUrls.sendMessage}`, // Ensure the endpoint is correct
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message via API:', error);
    throw error;
  }
};
