// src/hooks/useGetUserProperties.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../api';
import { apiUrls } from '../../utils/urls';

export interface Property {
  property_id: number;
  property_type: string;
  property_category: string;
  property_age?: number;
  title: string;
  description: string;
  price: number;
  area: number;
  price_per_meter?: number;
  location?: string;
  listing_date: string;
  status?: string;
  ownership_type: string;
  contact_information?: string;
  property_images?: string[];
  property_videos?: string[];
  is_featured: boolean;
  featured_until?: string;
  bedrooms?: number;
  bathrooms?: number;
  has_water: boolean;
  has_electricity: boolean;
  has_sewage: boolean;
  direction?: 'North' | 'South' | 'East' | 'West';
  view_count: number;
  total_view_duration: number;
}

interface GetUserPropertiesParams {
  pageParam?: string;
  status?: string;
  property_type?: string;
  page_size?: number;
}

interface PaginatedUserPropertiesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  properties: Property[];  // Previously 'results' if that was the case
}

const getUserProperties = async ({
  pageParam,
  status,
  property_type,
  page_size = 10,
}: GetUserPropertiesParams): Promise<PaginatedUserPropertiesResponse> => {
  try {
    let url = pageParam || apiUrls.getUserProperties;
    const params = new URLSearchParams();
    if (!pageParam) {
      if (status) params.append('status', status);
      if (property_type) params.append('property_type', property_type);
      params.append('page_size', page_size.toString());
      url = `${url}?${params.toString()}`;
    }

    const response = await api.get<PaginatedUserPropertiesResponse>(url);
    console.log('API Response:', response);

    if (!response || !response.properties) {
      console.error('Validation Error: Invalid data structure', response);
      throw new Error('Invalid response structure for user properties.');
    }

    return response;
  } catch (error: any) {
    console.error('[getUserProperties] Error:', error);
    throw error;
  }
};





interface UseGetUserPropertiesOptions {
  status?: string;
  property_type?: string;
  page_size?: number;
}

export const useGetUserProperties = (options: UseGetUserPropertiesOptions = {}) => {
  const { status, property_type, page_size } = options;

  return useInfiniteQuery<PaginatedUserPropertiesResponse, Error>({
    queryKey: ['userProperties', { status, property_type, page_size }],
    queryFn: ({ pageParam }) => getUserProperties({ 
      pageParam, 
      status, 
      property_type, 
      page_size 
    }),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    onError: (error) => {
      console.error('[useGetUserProperties] Error fetching properties:', error);
    },
  });
};

// Example usage:
// const { 
//   data,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
//   isLoading,
//   error 
// } = useGetUserProperties({
//   status: 'available',
//   property_type: 'for_sale',
//   page_size: 20
// });