// services/useGetProfile.ts

import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { apiUrls } from '../../utils/urls';

export interface ProfileData {
  email: string;
  id: number;
  name: string;
  kids?: Kid[];
  // subscriptions?: SubscriptionResponse[]
}

export interface Kid {
  id: number;
  name: string;
  age: number;
}

const getProfile = async (): Promise<ProfileData> => {
  try {
    const data = await api.get<ProfileData>(apiUrls.userProfile);
    console.log("Profile API response:", data); // Log the data
    return data; // Adjust based on api.get's return structure
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

interface UseGetProfileParams {
  enabled: boolean;
}

export const useGetProfile = (params: UseGetProfileParams = { enabled: false }) => {
  const { enabled } = params;
  return useQuery<ProfileData, Error>({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled,
    retry: false, // Optional: Prevent automatic retries
    staleTime: Infinity, // Optional: Cache indefinitely
  });
};
