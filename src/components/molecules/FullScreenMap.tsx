import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export const FullScreenMap = ({ visible, onClose, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate); // Update the marker position
  };

  const handleConfirmLocation = () => {
    if (markerPosition) {
      onLocationSelect(markerPosition); // Pass the marker position to the parent
      onClose(); // Close the full-screen map
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          onPress={handleMapPress} // Handle map press for marker placement
          initialRegion={{
            latitude: 37.78825, // Default location
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markerPosition && <Marker coordinate={markerPosition} />}
        </MapView>

        {/* Confirm Button */}
        <View style={{ position: 'absolute', bottom: 30, left: 10, right: 10 }}>
          <TouchableOpacity
            onPress={handleConfirmLocation}
            style={{
              backgroundColor: 'green',
              padding: 20,
              borderRadius: 30,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FullScreenMap;
