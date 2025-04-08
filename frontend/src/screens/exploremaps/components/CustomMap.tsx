/* eslint-disable react-native/no-inline-styles */
// src/components/CustomMap.tsx

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

const SERIF_FONT_FAMILY = 'Times New Roman';

// Example city data. Each city also references which region it belongs to.
const allCities = [
  { name: 'Arar',     latitude: 30.2, longitude: 41.0,   regionId: 'north' },
  { name: 'Al Jawf',  latitude: 29.7, longitude: 40.3,   regionId: 'north' },
  { name: 'Tabuk',    latitude: 28.3833, longitude: 36.5662, regionId: 'north' },
  { name: 'Hail',     latitude: 27.5114, longitude: 41.7208, regionId: 'north' },

  { name: 'Riyadh',   latitude: 24.7136, longitude: 46.6753, regionId: 'central' },
  { name: 'Al Qassim',latitude: 26.3062, longitude: 43.9888, regionId: 'central' },

  { name: 'Dammam',   latitude: 26.4, longitude: 49.8,    regionId: 'east' },
  { name: 'Al Ahsa',  latitude: 25.1, longitude: 49.6208, regionId: 'east' },

  { name: 'Jeddah',   latitude: 21.7, longitude: 39.2,    regionId: 'west' },
  { name: 'Makkah',   latitude: 21.3891, longitude: 39.95,regionId: 'west' },
  { name: 'Al Madina',latitude: 24.5247, longitude: 39.5692, regionId: 'west' },

  { name: 'Al Bahah', latitude: 20.0129, longitude: 41.4677, regionId: 'south' },
  { name: 'Aseer',    latitude: 18.2167, longitude: 42.5,    regionId: 'south' },
  { name: 'Najran',   latitude: 17.7654, longitude: 44.1289, regionId: 'south' },
  { name: 'Jazan',    latitude: 16.8892, longitude: 42.551,  regionId: 'south' },
];

// Define your cluster “regions.” Each cluster has:
// - a regionId (matching city regionId)
// - a marker coordinate (for the large marker)
// - a bounding Region to animate to
// - a name
const clusters = [
  {
    regionId: 'north',
    name: 'Northern Region',
    markerLat: 29.0,
    markerLng: 39.5,
    region: {
      latitude: 28.5,
      longitude: 40.0,
      latitudeDelta: 5,
      longitudeDelta: 5,
    },
  },
  {
    regionId: 'central',
    name: 'Central Region',
    markerLat: 25.0,
    markerLng: 45.0,
    region: {
      latitude: 25.0,
      longitude: 45.0,
      latitudeDelta: 5,
      longitudeDelta: 5,
    },
  },
  {
    regionId: 'east',
    name: 'Eastern Region',
    markerLat: 26.0,
    markerLng: 49.0,
    region: {
      latitude: 25.5,
      longitude: 49.0,
      latitudeDelta: 4,
      longitudeDelta: 4,
    },
  },
  {
    regionId: 'west',
    name: 'Western Region',
    markerLat: 22.5,
    markerLng: 39.0,
    region: {
      latitude: 22.5,
      longitude: 39.0,
      latitudeDelta: 5,
      longitudeDelta: 5,
    },
  },
  {
    regionId: 'south',
    name: 'Southern Region',
    markerLat: 19.0,
    markerLng: 42.0,
    region: {
      latitude: 19.0,
      longitude: 42.0,
      latitudeDelta: 5,
      longitudeDelta: 5,
    },
  },
];

// Fully zoomed-out kingdom region
const FULL_REGION: Region = {
  latitude: 23.8859,
  longitude: 45.0792,
  latitudeDelta: 20,
  longitudeDelta: 20,
};

/** Vintage style:
 * - Desert color for land
 * - Blue for water
 * - Hide roads, POIs, neighborhoods
 * - Hide all city labels
 * - Black country & province borders
 */
const customMapStyle = [
  // Desert fill
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f4cdaa' }],
  },
  // Water fill
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#7c9cae' }],
  },
  // Hide roads, POIs, neighborhoods
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.neighborhood', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  // Country & province borders in black
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'on' }, { color: '#000000' }, { weight: 1 }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'on' }, { color: '#000000' }, { weight: 0.7 }],
  },
  // Hide all admin labels (cities, countries, etc.)
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

export const CustomMap = () => {
  const mapRef = useRef<MapView>(null);

  // Track whether we’re in "full kingdom" view or a "zoomed cluster" view
  const [isFullView, setIsFullView] = useState(true);
  // Which cluster is currently shown
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);

  // Animate to the cluster region, show city markers, and enable map scroll
  const handlePressCluster = (clusterItem: typeof clusters[0]) => {
    setIsFullView(false);
    setActiveRegionId(clusterItem.regionId);
    mapRef.current?.animateToRegion(clusterItem.region, 800);
  };

  // Return to the full map
  const handleBackToFullMap = () => {
    setIsFullView(true);
    setActiveRegionId(null);
    mapRef.current?.animateToRegion(FULL_REGION, 800);
  };

  // Filter city markers if we’re showing a cluster
  const visibleCities = isFullView
    ? [] // no city markers when in the full view
    : allCities.filter((c) => c.regionId === activeRegionId);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={customMapStyle}
        region={FULL_REGION}
        // If full view, map is locked. In cluster view, user can scroll/zoom
        scrollEnabled={!isFullView}
        zoomEnabled={!isFullView}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        {/* Vertical "The Kingdom of Saudi Arabia" label */}
        {isFullView && (
          <Marker coordinate={{ latitude: 23.8859, longitude: 45.0792 }}>
            <View style={styles.kingdomLabelContainer}>
              <Text style={styles.kingdomLabelText}>The Kingdom of Saudi Arabia</Text>
            </View>
          </Marker>
        )}

        {/* Show cluster markers only if in full view */}
        {isFullView &&
          clusters.map((cl) => (
            <Marker
              key={cl.regionId}
              coordinate={{ latitude: cl.markerLat, longitude: cl.markerLng }}
              onPress={() => handlePressCluster(cl)}
            >
              <View style={styles.clusterMarkerWrap}>
                <Text style={styles.clusterMarkerText}>{cl.name}</Text>
              </View>
            </Marker>
          ))}

        {/* Show city markers only in cluster view */}
        {!isFullView &&
          visibleCities.map((city, idx) => (
            <Marker
              key={`city-${idx}-${city.name}`}
              coordinate={{ latitude: city.latitude, longitude: city.longitude }}
            >
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/images/marker.png')}
                  style={styles.cityMarker}
                  resizeMode="contain"
                />
                <View style={styles.cityNameContainer}>
                  <Text style={styles.cityNameText}>{city.name}</Text>
                </View>
              </View>
            </Marker>
          ))}
      </MapView>

      {/* Show "Back" button if in cluster view */}
      {!isFullView && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackToFullMap}>
          <Text style={styles.backButtonText}>Back to Full Map</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  kingdomLabelContainer: {
    backgroundColor: 'transparent',
    // No transform, so it's purely horizontal
  },
  // The text styling
  kingdomLabelText: {
    fontSize: 18,
    fontFamily: 'Times New Roman', // or another serif for a vintage look
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 1,
    // No rotate transform => stays horizontal
  },
  clusterMarkerWrap: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clusterMarkerText: {
    fontSize: 12,
    fontFamily: SERIF_FONT_FAMILY,
    fontWeight: '600',
    color: '#000',
  },
  cityMarker: {
    width: 40,
    height: 40,
  },
  cityNameContainer: {
    marginTop: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderColor: '#000',
    borderWidth: 1,
  },
  cityNameText: {
    fontSize: 10,
    fontFamily: SERIF_FONT_FAMILY,
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: SERIF_FONT_FAMILY,
    color: '#000',
    fontWeight: '600',
  },
});

export default CustomMap;
