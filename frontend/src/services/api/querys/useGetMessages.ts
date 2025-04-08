import axios from 'axios';
import { BASE_URL, apiUrls } from '../../utils/urls';

// -----------------------------------------------------------------------
// Existing interfaces and types
export interface PaginatedMessages {
  count: number;
  next: string | null;
  previous: string | null;
  results: Message[];
}

export interface ConversationSnippet {
  partner_id: number;
  partner_name: string;
  partner_profile_picture: string | null;
  last_message_body: string;
  last_message_timestamp: string;
  last_message_status: string;
}

export const fetchConversationList = async (token: string): Promise<ConversationSnippet[]> => {
  const url = `${BASE_URL}/${apiUrls.fetchConversations}`; // or wherever your ConversationListAPIView is
  const response = await axios.get<ConversationSnippet[]>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// -----------------------------------------------------------------------
// Chat-related interfaces
export interface UserMinimal {
  user_id: number;
  email: string;
  name: string;
  phone_number: string;
  profile_picture?: string | null;
}

export interface Property {
  lister_id: number;
  lister_name: string;
  address: string;
}

export interface Message {
  id: string;
  sender: UserMinimal;
  receiver: UserMinimal | number;
  body: string;
  timestamp: string; // ISO string
  status: string;
  property?: Property;
}

/**
 * Paginated fetch: returns a full PaginatedMessages object, including 'next' and 'previous' URLs.
 * Use this if you've enabled pagination (page_size=15, for example) in your ChatListAPIView.
 * page param is optional; if you pass page=2, you'll get the second page, etc.
 */
export const fetchChats = async (
  token: string,
  partnerId?: number,
  propertyId?: number,
  page?: number
): Promise<PaginatedMessages> => {
  try {
    let url = `${BASE_URL}/${apiUrls.fetchChats}`;
    const params = new URLSearchParams();

    if (partnerId) params.append('partner_id', String(partnerId));
    if (propertyId) params.append('property_id', String(propertyId));
    if (page) params.append('page', String(page));

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // DRF Pagination returns { count, next, previous, results: [...] }
    return response.data;
  } catch (error) {
    console.error('Error fetching paginated chat history:', error);
    throw error;
  }
};


