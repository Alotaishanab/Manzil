import {useMutation} from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';

export interface MakePropertyFeaturedResponse {
  message?: string;
  error: string;
}

export type MakePropertyFeaturedRequest = {
  property_id: number;
};

const makePropertyFeatured = async ({
  property_id,
}: MakePropertyFeaturedRequest): Promise<MakePropertyFeaturedResponse> => {
  try {
    const response = await api.post<MakePropertyFeaturedResponse>(
      `${apiUrls.makePropertyFeatured}/${property_id}/make-featured`,
      {},
    );
    //@ts-ignore
    return response;
  } catch (error) {
    console.error('Error making property featured', error);
    throw error;
  }
};

export const useMakePropertyFeatured = () => {
  return useMutation<
    MakePropertyFeaturedResponse,
    Error,
    MakePropertyFeaturedRequest
  >({
    mutationFn: makePropertyFeatured,
  });
};
