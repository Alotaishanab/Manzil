import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDate } from '@helpers';
import { fonts } from '@fonts';

export interface PropertyDetailsData {
  title: string;
  area: string; // e.g. "333.00"
  bathrooms: number | null; // common field (only used if extra "baths" is not provided)
  bedrooms: number | null;  // common field (only used if extra "beds" is not provided)
  living_rooms: number | null;
  property_category: string; // also used as indicator for extra fields
  property_type: string;
  listing_date: string;
  property_age: number;
  address?: string;
  // Optional extra fields:
  beds?: number;         // use these for extra display if available; fallback to bedrooms
  baths?: number;        // fallback to bathrooms
  floors?: number;
  rooms?: number;
  floorNumber?: number;
  numberOfStreets?: number;
  footTraffic?: string;
  proximity?: string;
  numberOfGates?: number;
  loadingDocks?: number;
  storageCapacity?: number;
  numberOfUnits?: number;
  parkingSpaces?: number;
  // New optional field for direction
  direction?: string;
}

interface PropertyDetailsProps {
  details: PropertyDetailsData;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ details }) => {
  // Common fields for every property
  const commonFields: { label: string; value: string }[] = [
    { label: 'Title', value: details.title || 'N/A' },
    { label: 'Category', value: details.property_category || 'N/A' },
    {
      label: 'Size',
      value: details.area ? `${parseFloat(details.area).toFixed(0)} sqft` : 'N/A',
    },
    {
      label: 'Property Age',
      value: details.property_age ? `${details.property_age} years` : 'N/A',
    },
    {
      label: 'Listing Date',
      value: details.listing_date ? formatDate(details.listing_date) : 'N/A',
    },
  ];

  // Build extra fields based on property category.
  // We use details.property_category (or details.property_type) as the indicator.
  // If extra fields (like beds or baths) are not provided, we fallback to bedrooms/bathrooms.
  let extraFields: { label: string; value: string | number }[] = [];
  const type = details.property_category; // or details.property_type
  switch (type) {
    case 'House':
      extraFields = [
        { label: 'Beds', value: details.beds !== undefined ? details.beds : (details.bedrooms ?? 'N/A') },
        { label: 'Baths', value: details.baths !== undefined ? details.baths : (details.bathrooms ?? 'N/A') },
        { label: 'Floors', value: details.floors !== undefined ? details.floors : 'N/A' },
        { label: 'Living Rooms', value: details.living_rooms !== null ? details.living_rooms : 'N/A' },
        { label: 'Direction', value: details.direction || 'N/A' },
      ];
      break;
    case 'Appartment':
      extraFields = [
        { label: 'Rooms', value: details.rooms !== undefined ? details.rooms : 'N/A' },
        { label: 'Floor No', value: details.floorNumber !== undefined ? details.floorNumber : 'N/A' },
        { label: 'Baths', value: details.baths !== undefined ? details.baths : (details.bathrooms ?? 'N/A') },
        { label: 'Living Rooms', value: details.living_rooms !== null ? details.living_rooms : 'N/A' },
        { label: 'Floors', value: details.floors !== undefined ? details.floors : 'N/A' },
        { label: 'Direction', value: details.direction || 'N/A' },
      ];
      break;
    case 'Workers Residence':
      extraFields = [
        { label: 'Beds', value: details.beds !== undefined ? details.beds : (details.bedrooms ?? 'N/A') },
        { label: 'Baths', value: details.baths !== undefined ? details.baths : (details.bathrooms ?? 'N/A') },
        { label: 'Direction', value: details.direction || 'N/A' },
      ];
      break;
    case 'Land':
      extraFields = [
        { label: 'Direction', value: details.direction || 'N/A' },
        { label: 'Streets', value: details.numberOfStreets !== undefined ? details.numberOfStreets : 'N/A' },
      ];
      break;
    case 'Farmhouse':
      extraFields = [
        { label: 'Beds', value: details.beds !== undefined ? details.beds : (details.bedrooms ?? 'N/A') },
        { label: 'Baths', value: details.baths !== undefined ? details.baths : (details.bathrooms ?? 'N/A') },
        { label: 'Living Rooms', value: details.living_rooms !== null ? details.living_rooms : 'N/A' },
        { label: 'Direction', value: details.direction || 'N/A' },
      ];
      break;
    case 'Shop':
      // Do not add the "Direction" field here.
      extraFields = [
        { label: 'Foot Traffic', value: details.footTraffic || 'N/A' },
        { label: 'Proximity', value: details.proximity || 'N/A' },
      ];
      break;
    case 'Chalet':
      extraFields = [
        { label: 'Beds', value: details.beds !== undefined ? details.beds : (details.bedrooms ?? 'N/A') },
        { label: 'Baths', value: details.baths !== undefined ? details.baths : (details.bathrooms ?? 'N/A') },
        { label: 'Living Rooms', value: details.living_rooms !== null ? details.living_rooms : 'N/A' },
        { label: 'Direction', value: details.direction || 'N/A' },
      ];
      break;
    case 'Office':
      extraFields = [
        { label: 'Floors', value: details.floors !== undefined ? details.floors : 'N/A' },
        { label: 'Parking Spaces', value: details.parkingSpaces !== undefined ? details.parkingSpaces : 'N/A' },
        { label: 'Direction', value: details.direction || 'N/A' },
      ];
      break;
    case 'Warehouse':
      extraFields = [
        { label: 'Gates', value: details.numberOfGates !== undefined ? details.numberOfGates : 'N/A' },
        { label: 'Loading Docks', value: details.loadingDocks !== undefined ? details.loadingDocks : 'N/A' },
        { label: 'Storage', value: details.storageCapacity !== undefined ? details.storageCapacity : 'N/A' },
      ];
      break;
    case 'Tower':
      extraFields = [
        { label: 'Rooms', value: details.rooms !== undefined ? details.rooms : 'N/A' },
        { label: 'Baths', value: details.baths !== undefined ? details.baths : (details.bathrooms ?? 'N/A') },
        { label: 'Units', value: details.numberOfUnits !== undefined ? details.numberOfUnits : 'N/A' },
        { label: 'Floors', value: details.floors !== undefined ? details.floors : 'N/A' },
        { label: 'Direction', value: details.direction || 'N/A' },
      ];
      break;
    default:
      // For any other property type (not explicitly listed) we add the direction field by default.
      extraFields = [
        { label: 'Direction', value: details.direction || 'N/A' },
      ];
      break;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Property Details</Text>
        <View style={styles.detailGrid}>
          {/* Render common fields */}
          {commonFields.map(({ label, value }) => (
            <View key={label} style={styles.detailCard}>
              <Text style={styles.detailItem}>{label}:</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
          {/* Render extra fields */}
          {extraFields.map((field) => (
            <View key={field.label} style={styles.detailCard}>
              <Text style={styles.detailItem}>{field.label}:</Text>
              <Text style={styles.detailValue}>{field.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 16,
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    // A subtle shadow for a flat, modern feel:
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: fonts.primary.bold,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailItem: {
    fontSize: 12,
    marginBottom: 4,
    color: '#777',
    fontFamily: fonts.primary.regular,
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.primary.bold,
  },
});

export default PropertyDetails;
