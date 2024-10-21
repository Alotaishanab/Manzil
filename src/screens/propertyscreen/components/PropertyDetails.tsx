import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../assets/fonts/index'; // Import fonts
import { useIntl } from '@context';

// Example property data (replace with actual data from backend)
const propertyDetails = {
  propertyType: 'House', // This should be dynamic based on the actual property type
  size: '1,863 sqft',
  pricePerMeter: '$845/sqft',
  propertyAge: '10 years',  // New field for property age
  direction: 'North',
  bedrooms: 3,
  bathrooms: 2,
  livingSpace: '2,000 sqft',
  floorNumber: 5,
  landSize: '10 acres',
  beds: 2,
  baths: 2,
  waterfrontAccess: true,
};

const propertyTypeFields = {
  House: ['propertyType', 'bedrooms', 'bathrooms', 'size', 'pricePerMeter', 'propertyAge', 'direction'],
  Apartment: ['propertyType', 'bedrooms', 'bathrooms', 'size', 'pricePerMeter', 'propertyAge', 'direction'],
  Tower: ['propertyType', 'livingSpace', 'size', 'pricePerMeter', 'propertyAge', 'direction'],
  Shop: ['propertyType', 'size', 'pricePerMeter', 'propertyAge', 'direction', 'floorNumber'],
  Farmhouse: ['propertyType', 'livingSpace', 'size', 'pricePerMeter', 'propertyAge', 'direction', 'beds', 'baths', 'landSize'],
  Chalet: ['propertyType', 'beds', 'baths', 'size', 'pricePerMeter', 'propertyAge', 'direction', 'waterfrontAccess'],
  Office: ['propertyType', 'size', 'pricePerMeter', 'propertyAge', 'direction', 'floorNumber'],
  Warehouse: ['propertyType', 'size', 'pricePerMeter', 'propertyAge', 'direction', 'floorNumber'],
  WorkerResidence: ['propertyType', 'size', 'pricePerMeter', 'propertyAge', 'direction', 'floorNumber'],
};

const PropertyDetails: React.FC = () => {
  const { intl } = useIntl();

  // Determine fields to display based on property type
  const propertyType = propertyDetails.propertyType; // Replace with dynamic value
  const fieldsToDisplay = propertyTypeFields[propertyType] || [];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Property Details</Text>
        
        {/* Display fields that come before utility details */}
        <View style={styles.detailGrid}>
          {fieldsToDisplay.includes('propertyType') && (
            <View style={styles.largeDetailCard}>
              <Text style={styles.largeDetailItem}>Property Type:</Text>
              <Text style={styles.largeDetailValue}>{propertyDetails.propertyType}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('size') && (
            <View style={styles.largeDetailCard}>
              <Text style={styles.largeDetailItem}>Size:</Text>
              <Text style={styles.largeDetailValue}>{propertyDetails.size}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('pricePerMeter') && (
            <View style={styles.largeDetailCard}>
              <Text style={styles.largeDetailItem}>Price per Meter:</Text>
              <Text style={styles.largeDetailValue}>{propertyDetails.pricePerMeter}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('bedrooms') && (
            <View style={styles.detailCard}>
              <Text style={styles.detailItem}>Bedrooms:</Text>
              <Text style={styles.detailValue}>{propertyDetails.bedrooms}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('bathrooms') && (
            <View style={styles.detailCard}>
              <Text style={styles.detailItem}>Bathrooms:</Text>
              <Text style={styles.detailValue}>{propertyDetails.bathrooms}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('propertyAge') && (
            <View style={styles.detailCard}>
              <Text style={styles.detailItem}>Property Age:</Text>
              <Text style={styles.detailValue}>{propertyDetails.propertyAge}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('direction') && (
            <View style={styles.detailCard}>
              <Text style={styles.detailItem}>Direction:</Text>
              <Text style={styles.detailValue}>{propertyDetails.direction}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('livingSpace') && (
            <View style={styles.detailCard}>
              <Text style={styles.detailItem}>Living Space:</Text>
              <Text style={styles.detailValue}>{propertyDetails.livingSpace}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('floorNumber') && (
            <View style={styles.detailCard}>
              <Text style={styles.detailItem}>Floor Number:</Text>
              <Text style={styles.detailValue}>{propertyDetails.floorNumber}</Text>
            </View>
          )}
          {fieldsToDisplay.includes('landSize') && (
            <View style={styles.detailCard}>
              <Text style={styles.detailItem}>Land Size:</Text>
              <Text style={styles.detailValue}>{propertyDetails.landSize}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    alignItems: 'center',
    },
  container: {
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginVertical: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    fontFamily: fonts.primary.bold, 
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  largeDetailCard: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,    
  },
  largeDetailItem: {
    fontSize: 14,
    color: '#777',
    fontFamily: fonts.primary.regular,
  },
  largeDetailValue: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.primary.bold,
  },
  detailCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  detailItem: {
    fontSize: 14,
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
