// PropertyDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropertyDetails: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Details</Text>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailItem}>Property Type:</Text>
        <Text style={styles.detailItem}>House</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailItem}>Size:</Text>
        <Text style={styles.detailItem}>1,863 sqft</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailItem}>Price per Meter:</Text>
        <Text style={styles.detailItem}>$845/sqft</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailItem}>Direction:</Text>
        <Text style={styles.detailItem}>North</Text>
      </View>
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
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
    textAlign: 'center', // Center align the title
    fontFamily: 'Jost', // Ensure Jost font is used
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Jost',  // Ensure Jost font is used
  },
});

export default PropertyDetails;
