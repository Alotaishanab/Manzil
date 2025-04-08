import { useMutation } from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';

type TrackPropertyViewParams = {
  propertyId: number;
  guestId?: string;
};

type TrackPropertyViewResponse = {
  message: string;
};

export const useTrackPropertyView = () => {
  return useMutation<TrackPropertyViewResponse, Error, TrackPropertyViewParams>(
    async ({ propertyId, guestId }) => {
      const response = await api.post<TrackPropertyViewResponse>(
        `${apiUrls.trackPropertyView}${propertyId}`,
        { guest_id: guestId }
      );
      return response;
    },
    {
      onSuccess: (data) => {
        console.log('Property view tracked successfully:', data);
      },
      onError: (error) => {
        console.error('Failed to track property view:', error);
      },
    }
  );
};
