import React, { useState, useCallback, useEffect } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '@colors';
import { MapLayerIcon } from '@svgs';

export const FullScreenMap = ({ visible, onClose, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapType, setMapType] = useState('standard');
  const [initialRegion, setInitialRegion] = useState({
    latitude: 24.7136,   // Fallback to Riyadh, Saudi Arabia
    longitude: 46.6753,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Request current location when the component mounts
  useEffect(() => {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInitialRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        (error) => {
          console.log('Error getting current location:', error);
          // Continue with the default initialRegion
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      console.warn('Geolocation is not available, using default location.');
    }
  }, []);

  // Handle map press to place or move marker
  const handleMapPress = useCallback((event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate);
  }, []);

  // Confirm and pass location to parent
  const handleConfirmLocation = () => {
    if (markerPosition) {
      onLocationSelect(markerPosition);
      onClose();
    }
  };

  // Toggle between standard and satellite map views
  const toggleMapType = () => {
    setMapType((prev) => (prev === 'standard' ? 'satellite' : 'standard'));
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={mapType}
          onPress={handleMapPress}
          initialRegion={initialRegion}
        >
          {markerPosition && (
            <Marker
              key={`${markerPosition.latitude}-${markerPosition.longitude}`}
              coordinate={markerPosition}
              pinColor={Colors.primary || 'green'}
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

export default FullScreenMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  map: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  closeIconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  toggleMapTypeButton: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.primary || 'green',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
  },
});
