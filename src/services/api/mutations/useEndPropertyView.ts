import { useMutation } from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';

type EndPropertyViewParams = {
  propertyId: number;
  duration: number;
  guestId?: string;
};

type EndPropertyViewResponse = {
  message: string;
  duration: number;
};

export const useEndPropertyView = () => {
  return useMutation<EndPropertyViewResponse, Error, EndPropertyViewParams>(
    async ({ propertyId, duration, guestId }) => {
      const response = await api.post<EndPropertyViewResponse>(
        `${apiUrls.endPropertyView}${propertyId}`,
        {
          duration_seconds: duration,
          guest_id: guestId,
        }
      );
      return response;
    },
    {
      onSuccess: (data) => {
        console.log('Property view ended successfully:', data);
      },
      onError: (error) => {
        console.error('Failed to end property view:', error);
      },
    }
  );
};
