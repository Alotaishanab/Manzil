/* eslint-disable react-native/no-inline-styles */
// src/components/CustomMap.tsx

import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapLayerIcon } from '@svgs';
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
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [currentView, setCurrentView] = useState<'kingdom' | 'city'>('kingdom');
  const zoomAnim = useRef(new Animated.Value(1)).current;

  // Initial kingdom view
  const KINGDOM_VIEW: Region = {
    latitude: 23.8859,
    longitude: 45.0792,
    latitudeDelta: 20,
    longitudeDelta: 20,
  };

  // Zoom into city with smooth animation
  const zoomInToCity = (city: typeof cities[0]) => {
    setCurrentView('city');
    
    // First zoom animation
    Animated.timing(zoomAnim, {
      toValue: 1.2,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      mapRef.current?.animateToRegion({
        latitude: city.latitude,
        longitude: city.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }, 1000, () => {
        // Final zoom animation
        Animated.spring(zoomAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
      });
    });
  };

  // Reset to kingdom view with animation
  const resetToKingdomView = () => {
    Animated.timing(zoomAnim, {
      toValue: 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      mapRef.current?.animateToRegion(KINGDOM_VIEW, 1000, () => {
        Animated.spring(zoomAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
        setCurrentView('kingdom');
      });
    });
  };

  // Handle map region changes
  const handleRegionChange = (region: Region) => {
    if (currentView === 'kingdom') {
      // Prevent any movement in kingdom view
      mapRef.current?.animateToRegion(KINGDOM_VIEW, 100);
    } else if (currentView === 'city') {
      // Check if user is trying to zoom out
      if (region.latitudeDelta > 1 || region.longitudeDelta > 1) {
        resetToKingdomView();
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        mapType={mapType}
        initialRegion={KINGDOM_VIEW}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        onRegionChange={handleRegionChange}
        customMapStyle={customMapStyle}
      >
        {cities.map((city, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: city.latitude, longitude: city.longitude }}
            onPress={() => zoomInToCity(city)}
          >
            <Animated.View style={{ transform: [{ scale: zoomAnim }] }}>
              <Image
                source={require('../../../assets/images/marker.png')}
                style={{ width: 50, height: 50 }}
              />
            </Animated.View>
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.markerText}>{city.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Map control buttons */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
        style={[styles.mapLayerBtn, { top: insets.top + 70 }]}
      >
        <MapLayerIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

const customMapStyle = [
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [{ "visibility": "on" }, { "color": "#f5deb3" }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [{ "visibility": "on" }, { "color": "#000" }, { "weight": 2 }]
  }
];

const styles = StyleSheet.create({
  callout: {
    padding: 5,
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  customLabelView: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 8,
  },
  customLabelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
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
});
