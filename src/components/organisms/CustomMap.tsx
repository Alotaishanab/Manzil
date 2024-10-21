import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Google Maps provider
import { FullScreenIcon, HouseIcon } from '@svgs'; // Icons
import { Colors } from '@colors';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export const CustomMap = ({
  showMaximizeScreen = true,
  height = 200,
  markerPosition,
  showHome = true,
  isAbsoluteFill = true,
  mapType = 'standard',
}) => {
  const navigation = useNavigation(); // React Navigation hook

  return (
    <View
      style={[
        isAbsoluteFill ? StyleSheet.absoluteFillObject : null,
        styles.container,
        {
          height: height, // Height control
          borderRadius: 5,
          overflow: 'hidden',
        },
      ]}
    >
      <MapView
        provider={PROVIDER_GOOGLE} // Use Google Maps provider
        style={styles.map}
        mapType={mapType}
        scrollEnabled={false} // Disable scrolling
        zoomEnabled={false} // Disable zooming
        rotateEnabled={false} // Disable rotating
        pitchEnabled={false} // Disable pitch (tilt)
        region={
          markerPosition
            ? {
                latitude: markerPosition.latitude,
                longitude: markerPosition.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : {
                latitude: 37.78825, // Default location
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
      >
        {markerPosition && (
          <Marker coordinate={markerPosition}>
            {showHome ? (
              <TouchableOpacity activeOpacity={0.8} style={styles.homeBtnStyle}>
                <HouseIcon fill={Colors.light.background} width={20} height={20} />
              </TouchableOpacity>
            ) : null}
          </Marker>
        )}
      </MapView>

      {/* Full-screen button */}
      {showMaximizeScreen && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MapScreen')} // Navigate to MapScreen
          style={styles.maximizeScreenBtn}
        >
          <FullScreenIcon width={25} height={25} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  maximizeScreenBtn: {
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 40,
    width: 40,
    top: 10,
    alignSelf: 'flex-end',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBtnStyle: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: Colors.light.mapHomeBtn,
  },
});
