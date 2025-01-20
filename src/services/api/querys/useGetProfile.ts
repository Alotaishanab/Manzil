// services/useGetProfile.ts

import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { apiUrls } from '../../utils/urls';

export interface ProfileData {
  id: number;
  email: string;
  name: string;
  profile_picture?: string | null; // optional + can be null
  // kids?: Kid[]; // if needed
  // ... any other fields from your server
}

const getProfile = async (): Promise<ProfileData> => {
  try {
    // `api.get` returns the raw JSON object, not { data: ... }
    const response = await api.get<ProfileData>(apiUrls.userProfile);

    console.log('Profile API raw response:', response);

    // If `response` is the actual user object, we check if it's null/undefined
    if (!response) {
      throw new Error('No profile data returned from the server.');
    }

    // Optionally, check if required fields exist:
    // if (!response.id || !response.email) {
    //   throw new Error('Incomplete profile data returned.');
    // }

    console.log('Profile final object returning:', response);
    return response; // Return the entire object
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

interface UseGetProfileParams {
  enabled?: boolean;
}

export const useGetProfile = (params: UseGetProfileParams = { enabled: false }) => {
  const { enabled } = params;

  return useQuery<ProfileData, Error>({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled,
    retry: false,
    staleTime: Infinity,
  });
};
