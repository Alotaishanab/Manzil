import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../assets/fonts/index'; // Import fonts

interface PropertyDetailsProps {
  title: string;
  area: number;
  bathrooms: number;
  bedrooms: number;
  livingRooms: number;
  propertyCategory: string;
  listingDate: string; // Date string to calculate property age
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  title,
  area,
  bathrooms,
  bedrooms,
  livingRooms,
  propertyCategory,
  listingDate,
}) => {

  // Calculate property age based on the listing date
  const calculatePropertyAge = (listingDate: string) => {
    const listingYear = new Date(listingDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return `${currentYear - listingYear} years`;
  };

  const propertyDetails = {
    title: title || 'N/A',
    size: area ? `${area} sqft` : 'N/A',
    bathrooms: bathrooms || 'N/A',
    bedrooms: bedrooms || 'N/A',
    livingRooms: livingRooms || 'N/A',
    propertyCategory: propertyCategory || 'N/A',
    propertyAge: listingDate ? calculatePropertyAge(listingDate) : 'N/A',
    listingDate: listingDate ? new Date(listingDate).toLocaleDateString('en-US') : 'N/A', // Explicitly use 'en-US' locale
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Property Details</Text>

        <View style={styles.detailGrid}>
          <View style={styles.largeDetailCard}>
            <Text style={styles.largeDetailItem}>Title:</Text>
            <Text style={styles.largeDetailValue}>{propertyDetails.title}</Text>
          </View>
          <View style={styles.largeDetailCard}>
            <Text style={styles.largeDetailItem}>Category:</Text>
            <Text style={styles.largeDetailValue}>{propertyDetails.propertyCategory}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailItem}>Size:</Text>
            <Text style={styles.detailValue}>{propertyDetails.size}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailItem}>Bathrooms:</Text>
            <Text style={styles.detailValue}>{propertyDetails.bathrooms}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailItem}>Bedrooms:</Text>
            <Text style={styles.detailValue}>{propertyDetails.bedrooms}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailItem}>Living Rooms:</Text>
            <Text style={styles.detailValue}>{propertyDetails.livingRooms}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailItem}>Property Age:</Text>
            <Text style={styles.detailValue}>{propertyDetails.propertyAge}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailItem}>Listing Date:</Text>
            <Text style={styles.detailValue}>{propertyDetails.listingDate}</Text>
          </View>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    paddingVertical: 10,
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
