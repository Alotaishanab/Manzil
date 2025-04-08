// src/hooks/useGetInterestedProperties.ts

import { useQuery } from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../utils/urls';

export interface GetInterestedPropertiesResponse {
  properties: {
    property_id: number;
    property_type: string;
    title: string;
    description: string;
    price: string;
    contact_information: any;
  }[];
}

const getInterestedProperties = async (): Promise<GetInterestedPropertiesResponse> => {
  try {
    const response = await api.get<GetInterestedPropertiesResponse>(
      `${apiUrls.exploreInterestedProperties}`,
      false // Do not send auth token
    );


    // Check if `response` is defined and properly formatted
    if (!response || !response.properties) {
      throw new Error('Invalid response structure for interested properties.');
    }

    return response; // Make sure to return the response correctly
  } catch (error) {
    console.error('Error fetching interested properties:', error);
    throw error;
  }
};

export const useGetInterestedProperties = () => {
  return useQuery<GetInterestedPropertiesResponse, Error>({
    queryKey: ['interestedProperties'],
    queryFn: getInterestedProperties,
  });
};
