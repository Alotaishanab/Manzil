import { useMutation } from '@tanstack/react-query';
import api from '../api';
import { apiUrls } from '../../utils/urls';
import AsyncHelper from '../../../helpers/asyncHelper';
import {
  DirectionType,
  FootTrafficType,
  PropertyFeature,
  OwnershipType,
  MarkerPosition,
} from '@services/types';

export interface AddPropertyResponse {
  propertyId: number;
  message: string;
}

export interface AddPropertyPayload {
  propertyType: string;
  area: string; // e.g., "333" (numeric string)
  propertyCategory: string;
  title: string;
  propertyAge: string; // numeric string
  description: string;
  ownershipType: OwnershipType;
  media: any[];
  floorPlan: string; // if provided, otherwise omit
  electricityAccess: boolean;
  sewageSystem: boolean;
  waterAccess: boolean;
  price: string; // numeric string
  markerPosition: MarkerPosition | null;
  ownership?: unknown;
  // House properties
  bedrooms?: number | null;
  bathrooms?: number | null;
  floors?: number | null;
  livingRooms?: number | null;
  // Apartment properties
  rooms?: number | null;
  floorNumber?: number | null;
  numberOfStreets?: number | null;
  direction: DirectionType | null;
  footTraffic?: FootTrafficType | null;
  // Warehouse
  numberOfGates?: number | null;
  loadingDocks?: number | null;
  storageCapacity?: number | null;
  proximity?: string;
  // Tower
  numberOfUnits?: number | null;
  // Office
  parkingSpaces?: number | null;
  propertyFeature: PropertyFeature[];
  // New fields:
  rentDuration?: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
  commission?: number;
  mainImageIndex?: number;
}

const addProperty = async (payload: AddPropertyPayload): Promise<AddPropertyResponse> => {
  try {
    const formData = new FormData();

    // Append required fields (all as strings)
    formData.append('propertyType', payload.propertyType);
    formData.append('area', payload.area);
    formData.append('propertyCategory', payload.propertyCategory);
    formData.append('title', payload.title);
    formData.append('propertyAge', String(payload.propertyAge));
    formData.append('description', payload.description);
    formData.append('ownershipType', payload.ownershipType);
    // Only append floorPlan if provided (non-empty)
    if (payload.floorPlan) {
      formData.append('floorPlan', payload.floorPlan);
    }
    formData.append('electricityAccess', String(payload.electricityAccess));
    formData.append('sewageSystem', String(payload.sewageSystem));
    formData.append('waterAccess', String(payload.waterAccess));
    formData.append('price', payload.price);

    if (payload.markerPosition) {
      formData.append('markerPosition.latitude', String(payload.markerPosition.latitude));
      formData.append('markerPosition.longitude', String(payload.markerPosition.longitude));
    }

    // Append optional numeric fields if present
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
        console.log(`Appending media file ${index}:`, formattedFile);
        formData.append('media', formattedFile);
      });
    }

    formData.append('propertyFeature', JSON.stringify(payload.propertyFeature));

    // Append new fields only if they have a truthy value
    if (payload.rentDuration) {
      formData.append('rentDuration', payload.rentDuration);
    }
    if (payload.commission != null && payload.commission !== '') {
      formData.append('commission', String(payload.commission));
    }
    if (payload.mainImageIndex != null && payload.mainImageIndex !== '') {
      formData.append('mainImageIndex', String(payload.mainImageIndex));
    }

    const token = await AsyncHelper.getToken();
    console.log('Retrieved Token:', token);
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await api.post<AddPropertyResponse>(
      apiUrls.addProperty,
      formData,
      true, // multipart = true
      true  // sendAuthToken = true
    );
    console.log('Add property response', response);
    return response;
  } catch (error) {
    console.log('error adding property', error);
    throw error;
  }
};

export const useAddProperty = () => {
  return useMutation<AddPropertyResponse, Error, AddPropertyPayload>({
    mutationFn: addProperty,
  });
};
