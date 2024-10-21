import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation
import { CustomMap } from '@components'; // Custom components for map
import { fonts } from '../../../assets/fonts/index'; // Import fonts

const MapComponent: React.FC = () => {
  const [scaleAnim] = useState(new Animated.Value(1)); // Scale animation for press effect
  const navigation = useNavigation(); // React Navigation hook

  // Function to handle press-in effect
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97, // Slightly scale down
      useNativeDriver: true,
    }).start();
  };

  // Function to handle press-out effect and navigate to the map screen
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Return to normal scale
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('MapScreen'); // Navigate to the map screen
    });
  };

  return (
    <View style={styles.outerContainer}>
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        {/* Map Title */}
        <Text style={styles.title}>Map</Text>

        {/* Clickable Custom Map */}
        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.7}>
          <View style={styles.mapWrapper}>
            <CustomMap
              markerPosition={undefined}
              scrollEnabled={false} // Disable map scrolling
              zoomEnabled={false} // Disable map zooming
              rotateEnabled={false} // Disable map rotation
            />
          </View>
        </TouchableOpacity>

        {/* Area and District Information */}
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
    paddingVertical: 10, // Adjusted for consistent spacing
  },
  mapWrapper: {
    width: '100%',
    height: 200, // Slightly reduced height for a more compact design
    overflow: 'hidden',
  },
  locationInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 10, // Slight padding for cleaner layout
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6, // Reduced padding for tighter design
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
