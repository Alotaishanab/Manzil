// src/services/api/queries/getMessages.ts

import axios from 'axios';
import { BASE_URL, apiUrls } from '../../utils/urls';

export interface Message {
  id: string;
  sender: {
    user_id: string;
    name: string;
  };
  receiver: {
    user_id: string;
    name: string;
  };
  body: string;
  timestamp: string;
}

// Fetch received messages with token as a parameter
export const fetchReceivedMessages = async (
  token: string
): Promise<Message[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${apiUrls.fetchReceivedMessages}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching received messages:', error);
    throw error;
  }
};

// Fetch sent messages with token as a parameter
export const fetchSentMessages = async (
  token: string
): Promise<Message[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${apiUrls.fetchSentMessages}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching sent messages:', error);
    throw error;
  }
};
