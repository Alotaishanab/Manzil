import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomMap } from '@components'; // Your custom map component
import { fonts } from '../../../assets/fonts/index';

const { height: screenHeight } = Dimensions.get('window');

export interface MarkerPosition {
  latitude: number;
  longitude: number;
}

/**
 * Parses a coordinate string in the format:
 * "SRID=4326;POINT (lng lat)"
 * and returns an object with latitude and longitude.
 */
export const parseCoordinates = (coordString: string): MarkerPosition | null => {
  if (!coordString) return null;
  // Example input: "SRID=4326;POINT (-122.42069218307735 37.78770540087569)"
  const regex = /POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i;
  const match = coordString.match(regex);
  if (match && match.length === 3) {
    const lng = parseFloat(match[1]);
    const lat = parseFloat(match[2]);
    return { latitude: lat, longitude: lng };
  }
  return null;
};

interface MapComponentProps {
  markerPosition?: MarkerPosition | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ markerPosition }) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const navigation = useNavigation();
  const modalOverlapHeight = screenHeight * 0.30;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      // Pass the markerPosition to MapScreen (if needed)
      navigation.navigate('MapScreen', { markerPosition });
    });
  };

  return (
    <View style={styles.outerContainer}>
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.title}>Map</Text>
        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.7}>
          <View style={styles.mapWrapper}>
            <CustomMap
              markerPosition={markerPosition}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.locationInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Area:</Text>
            <Text style={styles.infoValue}>Riyadh</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>District:</Text>
            <Text style={styles.infoValue}>AlMalga</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginVertical: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontFamily: fonts.primary.bold,
    paddingVertical: 10,
  },
  mapWrapper: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  locationInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
    fontFamily: fonts.primary.regular,
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.primary.bold,
  },
});

export default MapComponent;
