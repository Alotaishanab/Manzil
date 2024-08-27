import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

// Example data for area and location
const area = '5000 sqft';
const location = '123 Main St, Springfield';

const MapComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Area:</Text>
          <Text style={styles.infoValue}>{area}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9', // Light background for a modern look
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000', // Enhanced shadow for a modern 3D effect
    shadowOffset: { width: 0, height: 8 }, // Larger shadow offset
    shadowOpacity: 0.15, // Subtle shadow opacity
    shadowRadius: 12, // Larger shadow blur radius
    elevation: 6, // For Android shadow
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#333', // Darker color for better readability
    textAlign: 'center',
    fontFamily: 'Jost',
  },
  map: {
    width: '100%',
    height: 320, // Increased height for better map visibility
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15, // Space between map and info container
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12, // More vertical padding for a spacious look
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Subtle border color
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: '500', // Semi-bold font weight for labels
    color: '#555',
    fontFamily: 'Jost',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700', // Bold font weight for values
    color: '#222', // Darker color for better contrast
    fontFamily: 'Jost',
  },
});

export default MapComponent;
