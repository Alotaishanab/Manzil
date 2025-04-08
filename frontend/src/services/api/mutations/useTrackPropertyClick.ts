import { useMutation } from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';

type TrackPropertyClickParams = {
  propertyId: number;
  clickType: string;
  guestId?: string;
};

type TrackPropertyClickResponse = {
  message: string;
};

export const useTrackPropertyClick = () => {
  return useMutation<TrackPropertyClickResponse, Error, TrackPropertyClickParams>(
    async ({ propertyId, clickType, guestId }) => {
      const response = await api.post<TrackPropertyClickResponse>(
        `${apiUrls.trackPropertyClick}${propertyId}`,
        {
          click_type: clickType,
          guest_id: guestId,
        }
      );
      return response;
    },
    {
      onSuccess: (data) => {
        console.log('Property click tracked successfully:', data);
      },
      onError: (error) => {
        console.error('Failed to track property click:', error);
      },
    }
  );
};
