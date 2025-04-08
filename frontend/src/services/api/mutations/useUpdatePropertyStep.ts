import { useMutation } from '@tanstack/react-query';
import api from '../api';
import { apiUrls } from '../../utils/urls';
import AsyncHelper from '../../../helpers/asyncHelper';
import {
  DirectionType,
  FootTrafficType,
  PropertyFeature,
  MarkerPosition,
  OwnershipType,
} from '@services/types';

export interface UpdatePropertyStepResponse {
  propertyId: number;
  message: string;
}

export interface UpdatePropertyStepPayload {
  propertyType?: string;
  area?: string;
  propertyCategory?: string;
  title?: string;
  propertyAge?: string;
  description?: string;
  ownershipType?: OwnershipType;
  media?: any[];
  floorPlanFile?: File | string;
  electricityAccess?: boolean;
  sewageSystem?: boolean;
  waterAccess?: boolean;
  price?: string;
  markerPosition?: MarkerPosition;
  ownership?: unknown;
  bedrooms?: number | null;
  bathrooms?: number | null;
  floors?: number | null;
  livingRooms?: number | null;
  rooms?: number | null;
  floorNumber?: number | null;
  numberOfStreets?: number | null;
  direction?: DirectionType | null;
  footTraffic?: FootTrafficType | null;
  parkingSpaces?: number | null;
  numberOfGates?: number | null;
  loadingDocks?: number | null;
  storageCapacity?: number | null;
  numberOfUnits?: number | null;
  proximity?: string;
  propertyFeature?: PropertyFeature[];
  // New fields:
  rentDuration?: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
  commission?: number;
  mainImageIndex?: number;
  // Optional finalize flag
  finalize?: boolean;
}

const updatePropertyStep = async (
  propertyId: number,
  payload: UpdatePropertyStepPayload
): Promise<UpdatePropertyStepResponse> => {
  try {
    const formData = new FormData();
    if (payload.propertyType) formData.append('propertyType', payload.propertyType);
    if (payload.area) formData.append('area', payload.area);
    if (payload.propertyCategory) formData.append('propertyCategory', payload.propertyCategory);
    if (payload.title) formData.append('title', payload.title);
    if (payload.propertyAge) formData.append('propertyAge', String(payload.propertyAge));
    if (payload.description) formData.append('description', payload.description);
    if (payload.ownershipType) formData.append('ownershipType', payload.ownershipType);
    if (payload.floorPlanFile) {
      formData.append('floorPlan', payload.floorPlanFile as any);
    }
    if (typeof payload.electricityAccess !== 'undefined')
      formData.append('electricityAccess', String(payload.electricityAccess));
    if (typeof payload.sewageSystem !== 'undefined')
      formData.append('sewageSystem', String(payload.sewageSystem));
    if (typeof payload.waterAccess !== 'undefined')
      formData.append('waterAccess', String(payload.waterAccess));
    if (payload.price) formData.append('price', payload.price);
    if (payload.markerPosition) {
      formData.append('markerPosition.latitude', String(payload.markerPosition.latitude));
      formData.append('markerPosition.longitude', String(payload.markerPosition.longitude));
    }
    if (payload.bedrooms != null) formData.append('bedrooms', String(payload.bedrooms));
    if (payload.bathrooms != null) formData.append('bathrooms', String(payload.bathrooms));
    if (payload.floors != null) formData.append('floors', String(payload.floors));
    if (payload.livingRooms != null) formData.append('livingRooms', String(payload.livingRooms));
    if (payload.rooms != null) formData.append('rooms', String(payload.rooms));
    if (payload.floorNumber != null) formData.append('floorNumber', String(payload.floorNumber));
    if (payload.numberOfStreets != null) formData.append('numberOfStreets', String(payload.numberOfStreets));
    if (payload.direction) formData.append('direction', payload.direction);
    if (payload.footTraffic) formData.append('footTraffic', payload.footTraffic);
    if (payload.parkingSpaces != null) formData.append('parkingSpaces', String(payload.parkingSpaces));
    if (payload.numberOfGates != null) formData.append('numberOfGates', String(payload.numberOfGates));
    if (payload.loadingDocks != null) formData.append('loadingDocks', String(payload.loadingDocks));
    if (payload.storageCapacity != null) formData.append('storageCapacity', String(payload.storageCapacity));
    if (payload.numberOfUnits != null) formData.append('numberOfUnits', String(payload.numberOfUnits));
    if (payload.proximity) formData.append('proximity', payload.proximity);
    if (payload.ownership) {
      for (const [key, value] of Object.entries(payload.ownership)) {
        formData.append(`ownership.${key}`, String(value));
      }
    }
    if (payload.media && payload.media.length > 0) {
      payload.media.forEach((file, index) => {
        const formattedFile = {
          uri: file.uri,
          name: file.fileName || `media_${index}.${file.type.split('/')[1] || 'jpg'}`,
          type: file.type,
        };
        formData.append('media', formattedFile);
      });
    }
    if (payload.propertyFeature && payload.propertyFeature.length > 0) {
      formData.append('propertyFeature', JSON.stringify(payload.propertyFeature));
    }
    if (payload.rentDuration) formData.append('rentDuration', payload.rentDuration);
    if (payload.commission != null && payload.commission !== '') formData.append('commission', String(payload.commission));
    if (payload.mainImageIndex != null && payload.mainImageIndex !== '') formData.append('mainImageIndex', String(payload.mainImageIndex));
    if (payload.finalize !== undefined) formData.append('finalize', String(payload.finalize));

    const token = await AsyncHelper.getToken();
    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Construct update URL (adjust if needed)
    const updateUrl = `${apiUrls.addProperty}${propertyId}/update-step/`;

    const response = await api.patch<UpdatePropertyStepResponse>(
      updateUrl,
      formData,
      { headers: {} }
    );
    return response;
  } catch (error) {
    console.error('Error updating property step:', error);
    throw error;
  }
};

export const useUpdatePropertyStep = () => {
  return useMutation<
    UpdatePropertyStepResponse,
    Error,
    { propertyId: number; payload: UpdatePropertyStepPayload }
  >({
    mutationFn: ({ propertyId, payload }) => updatePropertyStep(propertyId, payload),
  });
};
