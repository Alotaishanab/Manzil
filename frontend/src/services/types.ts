export type DirectionType = 'North' | 'South' | 'East' | 'West';
export type FootTrafficType = 'High' | 'Medium' | 'Low';
export type PropertyFeature = {
  id: string;
  name: string;
  icon: string;
};
export type OwnershipType = 'independent' | 'multipleOwners' | 'agency';
export type MarkerPosition = { latitude: number; longitude: number };
