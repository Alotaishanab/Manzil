import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';

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

const addProperty = async (payload: AddPropertyPayload) => {
  try {
    const formData = new FormData();

    // Append the non-file data fields
    formData.append('propertyType', payload.propertyType);
    formData.append('area', payload.area);
    formData.append('propertyCategory', payload.propertyCategory);
    formData.append('title', payload.title);
    formData.append('propertyAge', payload.propertyAge);
    formData.append('description', payload.description);
    formData.append('ownershipType', payload.ownershipType);
    formData.append('floorPlan', payload.floorPlan);
    formData.append('electricityAccess', String(payload.electricityAccess));
    formData.append('sewageSystem', String(payload.sewageSystem));
    formData.append('waterAccess', String(payload.waterAccess));
    formData.append('price', payload.price);

    if (payload.markerPosition) {
      formData.append(
        'markerPosition.latitude',
        String(payload.markerPosition.latitude),
      );

      formData.append(
        'markerPosition.longitude',
        String(payload.markerPosition.longitude),
      );
    }

    if (payload.bedrooms) {
      formData.append('bedrooms', String(payload.bedrooms));
    }
    if (payload.bathrooms) {
      formData.append('bathrooms', String(payload.bathrooms));
    }
    if (payload.floors) {
      formData.append('floors', String(payload.floors));
    }
    if (payload.livingRooms) {
      formData.append('livingRooms', String(payload.livingRooms));
    }

    if (payload.ownership) {
      for (const ownershipKey of Object.keys(payload.ownership)) {
        formData.append(
          `ownership.${ownershipKey}`,
          String(payload.ownership[ownershipKey]),
        );
      }
    }

    if (payload.rooms) {
      formData.append('rooms', String(payload.rooms));
    }
    if (payload.floorNumber) {
      formData.append('floorNumber', String(payload.floorNumber));
    }

    formData.append('direction', payload.direction || '');
    formData.append('media', payload.media);

    formData.append('propertyFeature', JSON.stringify(payload.propertyFeature));

    const response = await api.post<AddPropertyResponse>(
      apiUrls.addProperty,
      formData,
      true,
      true,
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
    /** @ts-ignore */
    mutationFn: addProperty,
  });
};
