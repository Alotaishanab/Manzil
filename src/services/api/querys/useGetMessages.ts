import axios from 'axios';
import { BASE_URL, apiUrls } from '../../utils/urls';

export interface Message {
  id: string;
  sender: {
    user_id: number;
    email: string;
    name: string;
    phone_number: string;
    avatar?: string;
  };
  receiver: number; // Changed to number
  body: string;
  timestamp: string;
  status: string;
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

// NEW: Fetch chats (both received and sent messages merged together)
export const fetchChats = async (token: string): Promise<Message[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${apiUrls.fetchChats}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};
