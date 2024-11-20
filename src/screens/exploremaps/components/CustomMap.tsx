/* eslint-disable react-native/no-inline-styles */
// src/components/CustomMap.tsx

import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import MapViewClustering from 'react-native-map-clustering';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapLayerIcon, PenIcon } from '@svgs'; // Custom SVG icons
import { throttle } from 'lodash';
import { Colors } from '@colors';

const cities = [
  { name: 'Dammam', latitude: 26.3927, longitude: 49.9777 },
  { name: 'Riyadh', latitude: 24.7136, longitude: 46.6753 },
  { name: 'Al Ahsa', latitude: 25.3831, longitude: 49.6208 },
  { name: 'Arar', latitude: 30.9853, longitude: 41.0381 },
  { name: 'Hail', latitude: 27.5114, longitude: 41.7208 },
  { name: 'Al Qassim', latitude: 26.3062, longitude: 43.9888 },
  { name: 'Al Jawf', latitude: 29.9713, longitude: 40.2049 },
  { name: 'Tabuk', latitude: 28.3833, longitude: 36.5662 },
  { name: 'Al Madina', latitude: 24.5247, longitude: 39.5692 },
  { name: 'Makkah', latitude: 21.3891, longitude: 39.7579 },
  { name: 'Jeddah', latitude: 21.5858, longitude: 39.1925 },
  { name: 'Al Bahah', latitude: 20.0129, longitude: 41.4677 },
  { name: 'Aseer', latitude: 18.2167, longitude: 42.5000 },
  { name: 'Najran', latitude: 17.7654, longitude: 44.1289 },
  { name: 'Jazan', latitude: 16.8892, longitude: 42.5510 },
];

export const CustomMap = () => {
  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets();
  const [drawing, setDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState<Array<{ latitude: number; longitude: number }>>([]);
  const [showDrawMessage, setShowDrawMessage] = useState(false);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [cityLocked, setCityLocked] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Throttle handler to improve drawing performance
  const throttledHandleMapPress = useCallback(
    throttle((newCoordinate: { latitude: number; longitude: number }) => {
      setCoordinates((prevCoords) => [...prevCoords, newCoordinate]);
    }, 50),
    []
  );

  const handleMapPress = useCallback(
    (e: any) => {
      if (drawing) {
        const newCoordinate = e.nativeEvent.coordinate;
        throttledHandleMapPress(newCoordinate);
      }
    },
    [drawing, throttledHandleMapPress]
  );

  // Toggle drawing mode and show/hide message
  const handleToggleDrawing = useCallback(() => {
    setDrawing((prev) => !prev);
    setShowDrawMessage(true);
    setTimeout(() => setShowDrawMessage(false), 1000);
  }, []);

  // Clear the drawing
  const handleDeleteDrawing = useCallback(() => {
    setCoordinates([]);
  }, []);

  // Zoom into selected city
  const zoomInToCity = (city: { name: string; latitude: number; longitude: number }) => {
    setCityLocked(true);
    setSelectedCity(city.name);
    const region = {
      latitude: city.latitude,
      longitude: city.longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    };
    mapRef.current?.animateToRegion(region, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapViewClustering
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        mapType={mapType}
        scrollEnabled={!drawing && cityLocked}
        zoomEnabled={!drawing && cityLocked}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 23.8859,
          longitude: 45.0792,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
        clusterColor={Colors.light.primaryButton}
        clusterTextColor="#fff"
        clusterBorderColor="#fff"
        clusterBorderWidth={1}
        radius={50}
      >
        {cities.map((city, index) => (
          selectedCity !== city.name && (
            <Marker
              key={index}
              coordinate={{ latitude: city.latitude, longitude: city.longitude }}
              onPress={() => zoomInToCity(city)}
            >
              
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.markerText}>{city.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        ))}

        {/* Draw Polyline while drawing */}
        {coordinates.length > 0 && (
          <>
            <Polyline
              coordinates={coordinates}
              strokeColor="#307e20"
              strokeWidth={6}
              zIndex={2}
            />
            <Marker
              coordinate={coordinates[coordinates.length - 1]}
              pinColor="#307e20"
            />
          </>
        )}
      </MapViewClustering>

      {/* Display draw area message */}
      {drawing && showDrawMessage && (
        <View style={[styles.drawYourSearchAreaViewStyle, { top: insets.top + 50 }]}>
          <Text style={styles.drawSearchText}>Draw your search area</Text>
        </View>
      )}

      {/* Map control buttons */}
      {cityLocked && (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
            style={[styles.mapLayerBtn, { top: insets.top + 70 }]}
          >
            <MapLayerIcon width={30} height={30} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggleDrawing}
            style={[styles.mapLayerBtn, { top: insets.top + 120 }]}
          >
            <PenIcon width={30} height={30} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  callout: {
    padding: 5,
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapLayerBtn: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
    zIndex: 1001,
  },
  drawYourSearchAreaViewStyle: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  drawSearchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
