import {useQuery} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';

export interface GetInterestedPropertiesResponse {
  properties: {
    property_id: number;
    property_type: string;
    title: string;
    description: string;
    price: number;
    contact_information: any;
  }[];
}

const getInterestedProperties =
  async (): Promise<GetInterestedPropertiesResponse> => {
    const response = await api.get<GetInterestedPropertiesResponse>(
      `${apiUrls.exploreInterestedProperties}`,
    );

    console.log('response', response);

    /** @ts-ignore */
    return response;
  };

export const useGetInterestedProperties = () => {
  return useQuery<GetInterestedPropertiesResponse, Error>({
    queryKey: ['interestedProperties'],
    queryFn: () => getInterestedProperties(),
  });
};
