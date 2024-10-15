import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';

export interface SavePropertyResponse {
  message: string;
  saved_id: number;
}

export type SavePropertyRequest = {
  property_id: number;
};

const saveProperty = async ({
  property_id,
}: SavePropertyRequest): Promise<SavePropertyResponse> => {
  try {
    const response = await api.post<SavePropertyResponse>(
      `${apiUrls.saveProperty}/${property_id}/save`,
      {},
    );
    //@ts-ignore
    return response;
  } catch (error) {
    console.error('Error saving property', error);
    throw error;
  }
};

export const useSaveProperty = () => {
  return useMutation<SavePropertyResponse, Error, SavePropertyRequest>({
    mutationFn: saveProperty,
  });
};
