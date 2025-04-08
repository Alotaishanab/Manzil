// src/components/PropertyCardSimple.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // Ensure this is installed and linked
import { fonts } from '../../assets/fonts';
import { Colors } from '@colors';
import {TopSpace } from '@components'; // Adjusted for default export
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
} from '@svgs'; // Ensure these are correctly exported as named exports

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.6; // Adjust as needed

export const PropertyCardSimple = ({ item }) => {
  const navigation = useNavigation();

  // Function to handle click and navigate to PropertyScreen
  const handleClick = () => {
    console.log('Navigating to PropertyScreen with property ID:', item.id);
    navigation.navigate('PropertyScreen', { propertyId: item.id }); // Pass property ID to distinguish different properties
  };

  return (
    <LinearGradient
      colors={['#e6e6e6', '#ffffff']} // Subtle gradient colors for border effect
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.borderWrapper}
    >
      <View style={styles.mainWrapper}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleClick}
          accessibilityLabel={`View details for ${item.title}`}
        >
          {/* Property Image */}
          <Image
            source={
              item.image
                ? { uri: item.image }
                : require('../../../src/assets/images/nafath.png') // Ensure you have a placeholder image in your assets
            }
            style={styles.propertyImage}
            resizeMode="cover"
          />

          <TopSpace top={10} />

          {/* Price and Location */}
          <View style={styles.priceLocationContainer}>
            <Text style={styles.priceText}>
              {item.price.toLocaleString()} ﷼
            </Text>
            <Text style={styles.placeText}>{item.location}</Text>
          </View>

          <TopSpace top={5} />

          {/* Property Details */}
          <View style={styles.infoContainer}>
            <Text style={styles.descriptionText} numberOfLines={1}>
              {item.title}
            </Text>

            <TopSpace top={5} />

            <View style={styles.iconRow}>
              {/* Beds */}
              <View style={styles.iconWrapper}>
                <BedIcon width={20} height={20} />
                <Text style={styles.countText}>{item.beds} Beds</Text>
              </View>

              {/* Baths */}
              <View style={styles.iconWrapper}>
                <BathroomIcon width={24} height={24} />
                <Text style={styles.countText}>{item.baths} Baths</Text>
              </View>

              {/* Area */}
              <View style={styles.iconWrapper}>
                <AreaIcon width={24} height={24} />
                <Text style={styles.countText}>{item.size}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  borderWrapper: {
    borderRadius: 35, // Outer border radius slightly larger than mainWrapper for layering
    padding: 3, // Space for the gradient effect
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  mainWrapper: {
    borderRadius: 30,
    backgroundColor: Colors.light.background,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: ITEM_WIDTH,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 150, // Adjust height as needed
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.light.imagePlaceholder, // Optional: background color while image loads
  },
  priceLocationContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  priceText: {
    color: Colors.light.headingTitle,
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    marginBottom: 5,
  },
  placeText: {
    color: Colors.light.serialNoGreen,
    fontSize: 12,
    fontFamily: fonts.primary.medium,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  descriptionText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    marginLeft: 5,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
});

export default PropertyCardSimple;
