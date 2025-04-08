import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FullScreenIcon, HouseIcon } from '@svgs';
import { Colors } from '@colors';
import { useNavigation } from '@react-navigation/native';

interface CustomMapProps {
  showMaximizeScreen?: boolean;
  height?: number;
  markerPosition?: { latitude: number; longitude: number };
  showHome?: boolean;
  isAbsoluteFill?: boolean;
  mapType?: 'standard' | 'satellite' | 'hybrid';
}

export const CustomMap: React.FC<CustomMapProps> = ({
  height = 200,
  markerPosition,
  showHome = true,
  isAbsoluteFill = true,
  mapType = 'standard',
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        isAbsoluteFill ? StyleSheet.absoluteFillObject : null,
        styles.container,
        { height, borderRadius: 8, overflow: 'hidden' },
      ]}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={mapType}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        region={
          markerPosition
            ? {
                latitude: markerPosition.latitude,
                longitude: markerPosition.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
      >
        {markerPosition && (
          <Marker coordinate={markerPosition}>
            {showHome && (
              <TouchableOpacity activeOpacity={0.8} style={styles.homeBtn}>
                <HouseIcon fill={Colors.light.background} width={20} height={20} />
              </TouchableOpacity>
            )}
          </Marker>
        )}
      </MapView>
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
  fullscreenBtn: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 8,
    height: 40,
    width: 40,
    top: 10,
    right: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBtn: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: Colors.light.mapHomeBtn,
  },
});
