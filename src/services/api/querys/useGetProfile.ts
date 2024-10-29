import {useQuery} from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';

export interface ProfileData {
  email: string;
  name: string;
  kids: Kid[];
  // subscriptions: SubscriptionResponse[]
}

export interface Kid {
  id: number;
  name: string;
  age: number;
}

const getProfile = async (): Promise<ProfileData> => {
  try {
    const data = await api.get<ProfileData>(apiUrls.userProfile); // No need for .data
    console.log("Profile API response:", data); // Log the entire response
    return data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};



export const useGetProfile = () => {
  return useQuery<ProfileData, Error>({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });
};
