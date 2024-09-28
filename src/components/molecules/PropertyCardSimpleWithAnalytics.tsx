import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ImageCarousel } from '@components'; // Ensure correct import path
import { TopSpace } from '@components'; // Import TopSpace
import { fonts } from '../../../src/assets/fonts';
import { Colors } from '@colors';
import { useNavigation } from '@react-navigation/native';

// Import icons for analytics
import { EyeOpenIcon, HeartIcon, TouchIcon } from '@svgs'; // Example icons

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.55; // Increase card width slightly to make it bigger

export const PropertyCardSimpleWithAnalytics = ({ item }) => {
  const navigation = useNavigation();

  const images = [
    { uri: item.imageUrl },
    { uri: 'https://via.placeholder.com/75' }, // Smaller image placeholders
    { uri: 'https://via.placeholder.com/75' },
  ];

  // Function to handle click and navigate to PropertyScreen
  const handleClick = () => {
    navigation.navigate('PropertyScreen', { propertyId: item.id });
  };

  // Function to view analytics without a button
  const handleViewAnalytics = () => {
    navigation.navigate('AnalyticsScreen', { propertyId: item.id });
  };

  return (
    <View style={styles.mainWrapper}>
      <TouchableOpacity activeOpacity={0.9} onPress={handleClick}>
        <View style={styles.imageContainer}>
          <ImageCarousel images={images} imageStyle={styles.imageStyle} />
        </View>

        <TopSpace top={10} /> 

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleClick}>
            <Text style={styles.continueText}>View Details</Text>
          </TouchableOpacity>

          <Text onPress={handleViewAnalytics} style={styles.viewAnalyticsText}>
            View Analytics
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.analyticsContainer}>
            <View style={styles.analyticsItem}>
              <HeartIcon width={18} height={18} />
              <Text style={styles.analyticsValue}>{item.saves}</Text>
              <Text style={styles.analyticsLabel}>Saves</Text>
            </View>

            <View style={styles.analyticsItem}>
              <EyeOpenIcon width={18} height={18} />
              <Text style={styles.analyticsValue}>{item.views}</Text>
              <Text style={styles.analyticsLabel}>Views</Text>
            </View>

            <View style={styles.analyticsItem}>
              <TouchIcon width={18} height={18} />
              <Text style={styles.analyticsValue}>{item.clicks}</Text>
              <Text style={styles.analyticsLabel}>Clicks</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    paddingVertical: 0,
    borderRadius: 20,
    borderWidth: 1, // Added border to the card
    borderColor: Colors.light.serialNoGreen, // Border color
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: Colors.light.background,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
    height: 275, // Adjust height to make it bigger
    width: ITEM_WIDTH, // Slightly increased card width
    overflow: 'hidden',
    marginRight: 20,
  },
  continueText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    fontSize: 16, // Increased text size for "View Details"
    textDecorationLine: 'underline', // Keep underline, remove the border
  },
  imageContainer: {
    height: 160, // Increased height for a bigger image
    width: '100%',
    overflow: 'hidden',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover', // Ensure the images cover the entire space
  },
  actionRow: {
    flexDirection: 'row', // Arrange "View Details" and "View Analytics" in a row
    justifyContent: 'space-between', // Evenly space out the elements
    marginTop: 5,
    paddingHorizontal: 10,
  },
  analyticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  analyticsItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyticsValue: {
    fontFamily: fonts.primary.bold,
    fontSize: 18, // Increased size for the analytics values
    color: Colors.light.headingTitle,
    marginTop: 3,
  },
  analyticsLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: 12, // Adjusted size for labels
    color: Colors.light.subText,
  },
  viewAnalyticsText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    fontSize: 16, // Increased size for the text
    textDecorationLine: 'underline',
  },
});

export default PropertyCardSimpleWithAnalytics;
