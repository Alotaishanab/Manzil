import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { apiUrls } from '../../utils/urls';

export interface PropertyDetails {
  property_details: {
    property_id: number;
    property_type: string;
    property_category: string;
    property_age: number | null;
    title: string;
    description: string;
    price: number; // or number, depending on how you wish to handle decimals
    area: number;  // or number
    price_per_meter: string; // or number
    location: string | null;
    coordinates: string;
    listing_date: string;
    status: string | null;
    ownership_type: string;
    contact_information: string;
    property_images: string[];
    property_videos: string[];
    bedrooms: number | null;
    bathrooms: number | null;
    has_water: boolean;
    has_electricity: boolean;
    has_sewage: boolean;
    direction: string | null;
    floors: number | null;
    living_rooms: number | null;
    rooms: number | null;
    floor_number: number | null;
    number_of_streets: number | null;
    foot_traffic: string | null;
    proximity: string | null;
    parking_spaces: number | null;
    number_of_gates: number | null;
    loading_docks: number | null;
    storage_capacity: number | null;
    number_of_units: number | null;
    property_features: string;
    ad_id: number | null;
    ad_license_number: string | null;
    unified_number_of_establishment: string | null;
    fal_license_number: string | null;
    fal_registration_date: string | null;
    advertiser_info: any;
    similar_properties: any;
    view_count: number;
    total_view_duration: number;
    user: number;
  };
  lister_info: {
    lister_profile_picture: string | null;
    lister_name: string;
    lister_registration_date: string;
  };
  rented_period: string | null;
}

const getPropertyById = async (property_id: number): Promise<PropertyDetails> => {
  // The interceptor returns response.data directly.
  const response = await api.get<PropertyDetails>(`${apiUrls.getPropertyById}${property_id}`);
  console.log("Raw API response:", response);
  
  if (!response) {
    throw new Error("No property data returned from the API");
  }
  
  return response;
};

export const useGetPropertyById = (property_id: number) => {
  return useQuery<PropertyDetails, Error>({
    queryKey: ['property', property_id],
    queryFn: () => getPropertyById(property_id),
  });
};
