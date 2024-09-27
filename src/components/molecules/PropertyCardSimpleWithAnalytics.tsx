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
const ITEM_WIDTH = screenWidth * 0.5; // Reduce the card width to 50% of the screen

export const PropertyCardSimpleWithAnalytics = ({ item }) => {
  const navigation = useNavigation();

  // Example images array (adjust accordingly if your `item` contains more than one image)
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

  const handleIncompleteOrderClick = (order) => {
    navigation.navigate('ContinueOrder', { orderId: order.id });
  };

  const handleCompletedOrderClick = (order) => {
    navigation.navigate('ViewOrder', { orderId: order.id });
  };

  return (
    <View style={styles.mainWrapper}>
      <TouchableOpacity activeOpacity={0.9} onPress={handleClick}>
        <View style={styles.imageContainer}>
          <ImageCarousel images={images} imageStyle={styles.imageStyle} />
        </View>

        <TopSpace top={10} /> 

  <View style={styles.actionRow}>
    <TouchableOpacity onPress={() => handleCompletedOrderClick(item)}>
      <Text style={styles.continueText}>View Details</Text>
    </TouchableOpacity>

    <Text onPress={handleViewAnalytics} style={styles.viewAnalyticsText}>
      View Analytics
    </Text>
  </View>
        <View style={styles.infoContainer}>
          <View style={styles.analyticsContainer}>
            <View style={styles.analyticsItem}>
              <EyeOpenIcon width={14} height={14} />
              <Text style={styles.analyticsValue}>{item.views}</Text>
              <Text style={styles.analyticsLabel}>Views</Text>
            </View>

            <View style={styles.analyticsItem}>
              <HeartIcon width={14} height={14} />
              <Text style={styles.analyticsValue}>{item.saves}</Text>
              <Text style={styles.analyticsLabel}>Saves</Text>
            </View>

            <View style={styles.analyticsItem}>
              <TouchIcon width={14} height={14} />
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
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: Colors.light.background,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
    height: 350, // Adjust height as needed
    width: ITEM_WIDTH, // Smaller card width
    overflow: 'hidden',
    marginRight: 20,
  },
  orderText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    marginBottom: 8,
  },
  continueText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  imageContainer: {
    height: 150, // Increased the height for a taller picture
    width: '100%',
    overflow: 'hidden',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover', // Ensure the images cover the entire space
  },
  orderCard: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 220,
    justifyContent: 'center',
    elevation: 2,
  },
  priceLocationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 15, // Reduced padding for a tighter layout
    paddingTop: 10,
  },
  priceText: {
    color: Colors.light.headingTitle,
    fontSize: 20, // Adjusted text size for price
    fontFamily: fonts.primary.bold,
    marginBottom: 5,
  },
  placeText: {
    color: Colors.light.serialNoGreen,
    fontSize: 12, // Smaller text for location
    fontFamily: fonts.primary.medium,
  },
  descriptionText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 14, // Adjusted text size for title
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  analyticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10, // Adjust padding to fit the new layout
  },
  actionRow: {
    flexDirection: 'row', // Arrange "View Details" and "View Analytics" in a row
    justifyContent: 'space-between', // Evenly space out the elements
    paddingHorizontal: 15,
    marginTop: 5,
  },
  analyticsItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyticsValue: {
    fontFamily: fonts.primary.bold,
    fontSize: 12, // Reduced size for analytics values
    color: Colors.light.headingTitle,
    marginTop: 3,
  },
  analyticsLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: 10, // Minimized size for labels
    color: Colors.light.subText,
  },
  viewAnalyticsText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  footerWrap: {
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  dateText: {
    color: Colors.light.serialNoGreen,
    fontFamily: fonts.primary.regular,
    fontSize: 10, // Minimized date text
  },
});

export default PropertyCardSimpleWithAnalytics;
