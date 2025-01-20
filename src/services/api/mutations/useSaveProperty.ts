// src/services/mutations/saveProperty.ts
import { useMutation } from '@tanstack/react-query';
import api from '../../api/api';
import { apiUrls } from '../../utils/urls'; // <-- Import your apiUrls here

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
    // 1) Replace the ':id' placeholder with the actual property_id
    const endpoint = apiUrls.saveProperty.replace(':id', property_id.toString());

    // 2) Send the POST request to that URL
    const response = await api.post<SavePropertyResponse>(endpoint, {});
    return response;
  } catch (error) {
    console.error('Error saving property:', error);
    throw error;
  }
};

export const useSaveProperty = () => {
  return useMutation<SavePropertyResponse, Error, SavePropertyRequest>({
    mutationFn: saveProperty,
  });
};
