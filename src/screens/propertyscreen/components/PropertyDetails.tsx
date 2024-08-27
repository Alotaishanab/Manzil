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
  water: true,
  electricity: true,
  sewageSystem: false,
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
  House: ['propertyType', 'bedrooms', 'bathrooms', 'size', 'pricePerMeter', 'propertyAge', 'direction', 'water', 'electricity', 'sewageSystem'],
  Apartment: ['propertyType', 'bedrooms', 'bathrooms', 'size', 'pricePerMeter', 'propertyAge', 'direction', 'water', 'electricity', 'sewageSystem'],
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
    <View style={styles.container}>
      <Text style={styles.title}>Property Details</Text>
      
      {/* Display fields that come before utility details */}
      {fieldsToDisplay.includes('propertyType') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Property Type:</Text>
          <Text style={styles.detailItem}>{propertyDetails.propertyType}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('bedrooms') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Bedrooms:</Text>
          <Text style={styles.detailItem}>{propertyDetails.bedrooms}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('bathrooms') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Bathrooms:</Text>
          <Text style={styles.detailItem}>{propertyDetails.bathrooms}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('size') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Size:</Text>
          <Text style={styles.detailItem}>{propertyDetails.size}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('pricePerMeter') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Price per Meter:</Text>
          <Text style={styles.detailItem}>{propertyDetails.pricePerMeter}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('propertyAge') && (  // New field display condition
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Property Age:</Text>
          <Text style={styles.detailItem}>{propertyDetails.propertyAge}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('direction') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Direction:</Text>
          <Text style={styles.detailItem}>{propertyDetails.direction}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('livingSpace') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Living Space:</Text>
          <Text style={styles.detailItem}>{propertyDetails.livingSpace}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('floorNumber') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Floor Number:</Text>
          <Text style={styles.detailItem}>{propertyDetails.floorNumber}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('landSize') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Land Size:</Text>
          <Text style={styles.detailItem}>{propertyDetails.landSize}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('beds') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Beds:</Text>
          <Text style={styles.detailItem}>{propertyDetails.beds}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('baths') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Baths:</Text>
          <Text style={styles.detailItem}>{propertyDetails.baths}</Text>
        </View>
      )}
      {fieldsToDisplay.includes('waterfrontAccess') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Waterfront Access:</Text>
          <Text style={[styles.detailItem, propertyDetails.waterfrontAccess ? styles.checkmark : styles.crossmark]}>
            {propertyDetails.waterfrontAccess ? '✔' : '✘'}
          </Text>
        </View>
      )}
      
      {/* Display utility details last */}
      {fieldsToDisplay.includes('water') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Water:</Text>
          <Text style={[styles.detailItem, propertyDetails.water ? styles.checkmark : styles.crossmark]}>
            {propertyDetails.water ? '✔' : '✘'}
          </Text>
        </View>
      )}
      {fieldsToDisplay.includes('electricity') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Electricity:</Text>
          <Text style={[styles.detailItem, propertyDetails.electricity ? styles.checkmark : styles.crossmark]}>
            {propertyDetails.electricity ? '✔' : '✘'}
          </Text>
        </View>
      )}
      {fieldsToDisplay.includes('sewageSystem') && (
        <View style={styles.detailRow}>
          <Text style={styles.detailItem}>Sewage System:</Text>
          <Text style={[styles.detailItem, propertyDetails.sewageSystem ? styles.checkmark : styles.crossmark]}>
            {propertyDetails.sewageSystem ? '✔' : '✘'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    color: '#000',
    textAlign: 'center',
    fontFamily: fonts.primary.regular, // Ensure Jost font is used
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.primary.regular, // Ensure Jost font is used
  },
  checkmark: {
    fontSize: 20, // Adjust size as needed
    color: 'green',
  },
  crossmark: {
    fontSize: 30, // Adjust size as needed
    color: 'red', // Optional: Make the cross red for better visibility
  },
});

export default PropertyDetails;
