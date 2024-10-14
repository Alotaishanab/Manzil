import React, { useState, useCallback } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Use Google Maps provider
import { Colors } from '@colors'; // Assuming you're using a Colors object for styling
import { MapLayerIcon } from '@svgs'; // Using your existing icons

export const FullScreenMap = ({ visible, onClose, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapType, setMapType] = useState('standard'); // State for map type

  // Handle map press to place or move marker
  const handleMapPress = useCallback((event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate); // Update marker position instantly
  }, []);

  // Confirm and pass location to parent
  const handleConfirmLocation = () => {
    if (markerPosition) {
      onLocationSelect(markerPosition); // Pass the marker position to the parent
      onClose(); // Close the full-screen map
    }
  };

  // Toggle between standard and satellite map views
  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE} // Use Google Maps
          style={{ flex: 1 }}
          mapType={mapType} // Use mapType from state
          onPress={handleMapPress} // Handle map press for marker placement
          initialRegion={{
            latitude: 37.78825, // Default location
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markerPosition && (
            <Marker
              key={`${markerPosition.latitude}-${markerPosition.longitude}`} // Ensure re-render on position change
              coordinate={markerPosition}
              pinColor="green" // Set marker color to green
            />
          )}
        </MapView>

        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Image
            source={require('../../assets/images/close.png')}
            style={styles.closeIconImage}
          />
        </TouchableOpacity>

        {/* Toggle Map Type Button */}
        <TouchableOpacity onPress={toggleMapType} style={styles.toggleMapTypeButton}>
          <MapLayerIcon width={25} height={25} fill={Colors.light.background} />
        </TouchableOpacity>

        {/* Confirm Button */}
        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity onPress={handleConfirmLocation} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 60, // Lowered to move the close button down
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeIconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  toggleMapTypeButton: {
    position: 'absolute',
    top: 120, // Lowered below the close button
    right: 20, 
    height: 40,
    width: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 50,
    zIndex: 1,
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
  },
  confirmButton: {
    backgroundColor: 'green', // Confirm button color set to green
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FullScreenMap;
