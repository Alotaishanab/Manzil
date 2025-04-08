// src/hooks/useGetNearbyProperties.ts

import { useQuery } from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../utils/urls';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface GetNearbyPropertiesResponse {
  properties: {
    property_id: number;
    property_type: string;
    title: string;
    description: string;
    price: string;
    contact_information: any;
    distance: number;
  }[];
}

const getNearByProperties = async (location: UserLocation): Promise<GetNearbyPropertiesResponse> => {
  try {
    const response = await api.get<GetNearbyPropertiesResponse>(
      `${apiUrls.exploreNearbyProperties}?latitude=${location.latitude}&longitude=${location.longitude}`,
      false // Explicitly tell it NOT to send auth token
    );


    // Check if `response` is defined and properly formatted
    if (!response || !response.properties) {
      throw new Error('Invalid response structure for nearby properties.');
    }

    return response; // Ensure the correct response is returned
  } catch (error) {
    console.error('Error fetching nearby properties:', error);
    throw error;
  }
};

export const useGetNearbyProperties = (location: UserLocation) => {
  return useQuery<GetNearbyPropertiesResponse, Error>({
    queryKey: ['nearByProperties', location],
    queryFn: () => getNearByProperties(location),
  });
};
