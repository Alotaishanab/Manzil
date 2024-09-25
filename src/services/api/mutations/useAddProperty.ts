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
  markerPosition: any;

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
    const data = await api.post<AddPropertyResponse>(
      apiUrls.addProperty,
      payload,
    );

    return data;
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
