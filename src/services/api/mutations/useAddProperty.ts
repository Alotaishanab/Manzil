import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../utils/urls';
import AsyncHelper from '../../../helpers/asyncHelper'; // Adjust the import path accordingly

export interface AddPropertyResponse {
  propertyId: number;
  message: string;
}

export type DirectionType = 'North' | 'South' | 'East' | 'West';

export type FootTrafficType = 'High' | 'Medium' | 'Low';

export type PropertyFeature = {
  id: string;
  name: string;
  icon: string;
};

export type OwnershipType = 'independent' | 'multipleOwners' | 'agency';

export type MarkerPosition = {latitude: number; longitude: number};

export interface AddPropertyPayload {
  propertyType: string;
  area: string; // Maps to area in backend
  propertyCategory: string; // NEED TO confirm it's column
  title: string;
  propertyAge: string; // NEED TO confirm it's column
  description: string;
  ownershipType: OwnershipType;

  media: any[];
  floorPlan: string;

  electricityAccess: boolean;
  sewageSystem: boolean;
  waterAccess: boolean;

  price: string;
  markerPosition: MarkerPosition | null;

  ownership?: unknown;

  /** House properties */
  bedrooms?: number | null;
  bathrooms?: number | null;
  floors?: number | null;
  livingRooms?: number | null;

  /** Apartment properties */
  rooms?: number | null;
  floorNumber?: number | null;

  numberOfStreets?: number | null;

  direction: DirectionType | null;
  footTraffic?: FootTrafficType | null;

  /** Warehouse */
  numberOfGates?: number | null;
  loadingDocks?: number | null;
  storageCapacity?: number | null;
  proximity?: string;

  /** Tower */
  numberOfUnits?: number | null;

  /** Office */
  parkingSpaces?: number | null;

  propertyFeature: PropertyFeature[];
}

const addProperty = async (payload: AddPropertyPayload): Promise<AddPropertyResponse> => {
  try {
    const formData = new FormData();

    // Append non-file fields
    formData.append('propertyType', payload.propertyType);
    formData.append('area', payload.area);
    formData.append('propertyCategory', payload.propertyCategory);
    formData.append('title', payload.title);
    formData.append('propertyAge', String(payload.propertyAge));
    formData.append('description', payload.description);
    formData.append('ownershipType', payload.ownershipType);
    formData.append('floorPlan', payload.floorPlan || '');
    formData.append('electricityAccess', String(payload.electricityAccess));
    formData.append('sewageSystem', String(payload.sewageSystem));
    formData.append('waterAccess', String(payload.waterAccess));
    formData.append('price', payload.price);

    if (payload.markerPosition) {
      formData.append('markerPosition.latitude', String(payload.markerPosition.latitude));
      formData.append('markerPosition.longitude', String(payload.markerPosition.longitude));
    }

    // Append optional fields
    if (payload.bedrooms !== undefined && payload.bedrooms !== null) {
      formData.append('bedrooms', String(payload.bedrooms));
    }
    if (payload.bathrooms !== undefined && payload.bathrooms !== null) {
      formData.append('bathrooms', String(payload.bathrooms));
    }
    if (payload.floors !== undefined && payload.floors !== null) {
      formData.append('floors', String(payload.floors));
    }
    if (payload.livingRooms !== undefined && payload.livingRooms !== null) {
      formData.append('livingRooms', String(payload.livingRooms));
    }
    if (payload.rooms !== undefined && payload.rooms !== null) {
      formData.append('rooms', String(payload.rooms));
    }
    if (payload.floorNumber !== undefined && payload.floorNumber !== null) {
      formData.append('floorNumber', String(payload.floorNumber));
    }
    if (payload.numberOfStreets !== undefined && payload.numberOfStreets !== null) {
      formData.append('numberOfStreets', String(payload.numberOfStreets));
    }
    if (payload.direction) {
      formData.append('direction', payload.direction);
    }
    if (payload.footTraffic) {
      formData.append('footTraffic', payload.footTraffic);
    }
    if (payload.parkingSpaces !== undefined && payload.parkingSpaces !== null) {
      formData.append('parkingSpaces', String(payload.parkingSpaces));
    }
    if (payload.numberOfGates !== undefined && payload.numberOfGates !== null) {
      formData.append('numberOfGates', String(payload.numberOfGates));
    }
    if (payload.loadingDocks !== undefined && payload.loadingDocks !== null) {
      formData.append('loadingDocks', String(payload.loadingDocks));
    }
    if (payload.storageCapacity !== undefined && payload.storageCapacity !== null) {
      formData.append('storageCapacity', String(payload.storageCapacity));
    }
    if (payload.numberOfUnits !== undefined && payload.numberOfUnits !== null) {
      formData.append('numberOfUnits', String(payload.numberOfUnits));
    }
    if (payload.proximity) {
      formData.append('proximity', payload.proximity);
    }

    // Append ownership information
    if (payload.ownership) {
      for (const [key, value] of Object.entries(payload.ownership)) {
        formData.append(`ownership.${key}`, String(value));
      }
    }

    // Append media files
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

    // Append property features as JSON string
    formData.append('propertyFeature', JSON.stringify(payload.propertyFeature));

    // Retrieve the token using AsyncHelper
    const token = await AsyncHelper.getToken();
    console.log('Retrieved Token:', token); // Log the token

    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Do NOT set 'Content-Type' manually; let Axios handle it
    // Pass 'multipart=true' to let the Axios instance handle headers
    const response = await api.post<AddPropertyResponse>(
      apiUrls.addProperty,
      formData,
      true, // Set multipart to true
      true  // Ensure sendAuthToken is true
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