import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapLayerIcon, PenIcon } from '@svgs'; // Assuming these are your custom icons
import { throttle } from 'lodash';

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
  const mapRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [cityLocked, setCityLocked] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [mapType, setMapType] = useState('standard');
  const [drawing, setDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [showDrawMessage, setShowDrawMessage] = useState(false);

  const initialRegion = {
    latitude: 23.8859,
    longitude: 45.0792,
    latitudeDelta: 20,
    longitudeDelta: 20,
  };

  const zoomInToCity = (city) => {
    setCityLocked(true);
    setSelectedCity(city.name);
    const region = {
      latitude: city.latitude,
      longitude: city.longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    };
    mapRef.current.animateToRegion(region, 1000);
  };

  const handleToggleDrawing = useCallback(() => {
    if (drawing && coordinates.length > 1 && coordinates[0] !== coordinates[coordinates.length - 1]) {
      setCoordinates((prevCoords) => [...prevCoords, prevCoords[0]]); // Close the loop
    }
    setDrawing((prev) => !prev);
    setShowDrawMessage(true); // Show draw area message when entering drawing mode
  }, [drawing, coordinates]);

  const handleDeleteDrawing = useCallback(() => {
    setCoordinates([]);
    setShowDrawMessage(false);
  }, []);

  const handleMapPress = useCallback(
    (e) => {
      if (drawing) {
        const newCoordinate = e.nativeEvent.coordinate;
        throttledHandleMapPress(newCoordinate);
      }
    },
    [drawing]
  );

  const throttledHandleMapPress = useCallback(
    throttle((newCoordinate) => {
      setCoordinates((prevCoords) => [...prevCoords, newCoordinate]);
    }, 50),
    []
  );

  const handleRegionChange = (region) => {
    if (cityLocked && (region.latitudeDelta > 0.5 || region.longitudeDelta > 0.5)) {
      mapRef.current.animateToRegion({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      });
    }
  };

  useEffect(() => {
    if (drawing) {
      const timer = setTimeout(() => {
        setShowDrawMessage(false); // Hide draw area message after a delay
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [drawing]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={MapView.PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        scrollEnabled={!drawing && cityLocked} // Disable scrolling when drawing
        zoomEnabled={!drawing && cityLocked}   // Disable zooming when drawing
        mapType={mapType}
        onRegionChangeComplete={handleRegionChange}
        onPress={handleMapPress} // Capture map clicks during drawing
      >
        {cities.map((city, index) => (
          selectedCity !== city.name && (
            <Marker
              key={index}
              coordinate={{ latitude: city.latitude, longitude: city.longitude }}
              onPress={() => zoomInToCity(city)}
            >
              <View style={styles.marker}>
                <View style={styles.markerBackground}>
                  <Text style={styles.markerText}>{city.name}</Text>
                </View>
              </View>
            </Marker>
          )
        ))}
        {drawing && coordinates.length > 0 && (
          <Polygon coordinates={coordinates} strokeColor="#FF0000" fillColor="rgba(255,0,0,0.5)" />
        )}
      </MapView>

      {/* Optional draw area message */}
      {drawing && showDrawMessage && (
        <View style={[styles.drawYourSearchAreaViewStyle, { top: insets.top + 50 }]}>
          <Text style={styles.drawSearchText}>Draw your search area</Text>
        </View>
      )}

      {/* Overlay Buttons */}
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

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleDeleteDrawing}
            style={[styles.mapLayerBtn, { top: insets.top + 170 }]}
          >
            <Text style={styles.drawSketchText}>Draw from Scratch</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerBackground: {
    backgroundColor: '#307e20',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapLayerBtn: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
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
  drawSketchText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
