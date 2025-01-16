// src/services/api/querys/useGetSavedProperties.ts
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import api from '../api';
import { apiUrls } from '../../utils/urls';
import { AuthContext } from '../../../context/AuthContext'; // adjust the path as needed

export interface SavedProperty {
  property_id: number;
  property_type: string;
  title: string;
  description: string;
  price: number;
  contact_information: any;
  // Add more fields if needed based on your backend response
}

interface SavedPropertiesResponse {
  properties: SavedProperty[];
}

// API function to fetch saved properties for the current user
const getSavedProperties = async (): Promise<SavedPropertiesResponse> => {
  const response = await api.get<SavedPropertiesResponse>(
    apiUrls.getSavedProperties,
    true // send auth token
  );
  return response;
};

// React Query hook to fetch the saved properties for the user
export const useGetSavedProperties = () => {
  const { token } = useContext(AuthContext);
  
  return useQuery<SavedPropertiesResponse, Error>({
    queryKey: ['savedProperties'],
    queryFn: getSavedProperties,
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    enabled: Boolean(token), // Only run this query if a token exists.
  });
};
