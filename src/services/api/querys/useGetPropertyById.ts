import {useQuery} from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';

export interface PropertyDetails {
  property_id: number;
  property_type: string;
  title: string;
  description: string;
  price: number;
  contact_information: any;
}

const getPropertyById = async (
  property_id: number,
): Promise<PropertyDetails> => {
  const response = await api.get<PropertyDetails>(
    `${apiUrls.getPropertyById}/${property_id}`,
  );

  //@ts-ignore
  return response;
};

export const useGetPropertyById = (property_id: number) => {
  return useQuery<PropertyDetails, Error>({
    queryKey: ['property', property_id],
    queryFn: () => getPropertyById(property_id),
  });
};
