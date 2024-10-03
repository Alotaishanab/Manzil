import {useQuery} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';

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
    price: number;
    contact_information: any;
    distance: number;
  }[];
}

const getNearByProperties = async (
  location: UserLocation,
): Promise<GetNearbyPropertiesResponse> => {
  const response = await api.get<GetNearbyPropertiesResponse>(
    `${apiUrls.exploreNearbyProperties}?latitude=${location.latitude}&longitude=${location.longitude}`,
  );

  console.log('response', response);

  /** @ts-ignore */
  return response;
};

export const useGetNearbyProperties = (location: UserLocation) => {
  return useQuery<GetNearbyPropertiesResponse, Error>({
    queryKey: ['nearByProperties'],
    queryFn: () => getNearByProperties(location),
  });
};
