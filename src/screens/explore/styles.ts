// src/screens/styles.ts

import { StyleSheet } from 'react-native';
import { Colors } from '@colors';
import { width } from '../../hooks/useDimension';
import { fonts } from '../../../src/assets/fonts';
import { globalStyles } from '../../../src/styles/globalStyles';

export const styles = StyleSheet.create({
  // FilterHeader Styles
  exploreWrap: {
    borderRadius: 25,
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  filterBtn: {
    borderWidth: 1.5,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
    zIndex: 1001, // Ensure it stays above other components
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Adds shadow for Android
  },
  inputStyle: {
    flex: 1,
    height: '100%',
    fontSize: 16, // Increased font size for better readability
    lineHeight: 22,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    backgroundColor: 'transparent', // Transparent to show the frosted background
  },
  
  // Bottom Widget Styles
  bottomWidget: {
    position: 'absolute',
    bottom: 30, // Adjusted for better positioning
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
    borderRadius: 30, // Increased for a more pill-shaped appearance
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, // Added padding for better touch area
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset for depth
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, // Slightly increased elevation for Android
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)', // Light semi-transparent border for better separation
  },
  widgetButton: {
    width: 30,
    height: 30, // Increased height for better touch targets
    borderRadius: 15, // Changed to 15 for perfect circle
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Adds shadow for Android
  },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent separator
    marginHorizontal: 10, // Increased spacing for better visibility
  },

  // Error Message Styles
  errorContainer: {
    padding: 10,
    backgroundColor: Colors.light.errorBackground,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20, // Added horizontal margin for consistency
  },
  errorText: {
    color: Colors.light.errorText,
    textAlign: 'center',
    fontFamily: fonts.primary.regular,
  },

  // Agencies Section Styles
  topAgencyWrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
    borderRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingBottom: 20, // Added padding for bottom
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  topAgencyText: {
    fontSize: 16, // Ensure this matches the desired font size
    fontWeight: 'bold',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium, // Ensure consistent font family
  },
  sellAll: {
    fontSize: 14,
    color: Colors.light.primaryBtn,
    fontWeight: '600',
    fontFamily: fonts.primary.regular, // Ensure consistent font family
  },
  searchWithAiText: {
    fontSize: 14,
    color: Colors.light.primaryBtn,
    fontWeight: '600',
    fontFamily: fonts.primary.regular,
    marginRight: 5, // Space between text and arrow icon
  },
  agenciesList: {
    paddingVertical: 10,
  },

  // Recommended Section Styles
  recommendedSectionWrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
    borderRadius: 30,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingBottom: 20, // Added padding for bottom
    marginTop: 20, // Space between Top Agencies and Recommended Section
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  recommendedTitle: {
    fontSize: 16, // Same as topAgencyText for consistency
    fontWeight: 'bold',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
  },
  recommendedList: {
    paddingVertical: 10,
  },

  // Additional Styles from User's styles.ts
  filterSquareBtn: {
    borderWidth: 1.5,
    borderRadius: 17,
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Adds shadow for Android
  },
  firstFlatListContentContainerStyle: {
    paddingHorizontal: 10, // Increased padding for better spacing
    marginBottom: 4,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Colors.light.background,
  },
  mapBtn: {
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 10,
    width: width / 3.1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  mapBtnText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    marginRight: 10,
  },
  bottomWrap: {
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f7f7f7',
  },
  agencyBtn: {
    width: width * 0.45, // Set a fixed width for each card
    height: 180, // Adjusted height for card size
    borderRadius: 15, // Border radius for smooth edges
    marginRight: 15, // Margin for spacing between cards
    overflow: 'hidden', // Ensure content doesn't spill over rounded corners
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
    borderColor: 'rgba(255, 255, 255, 0.5)', // Light semi-transparent border color for distinction
    borderWidth: 1, // Thickness of the border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1, // Increased shadow opacity for more depth
    shadowRadius: 4, // Increased shadow radius for a softer shadow
    elevation: 4, // Slightly increased elevation for better depth
  },
  agencyImg: {
    width: '100%', // Full width to cover the card
    height: '100%', // Full height to cover the card
    resizeMode: 'cover', // Changed to 'cover' for better image coverage
    position: 'absolute', // Position absolutely to ensure it covers the entire card
    top: 0, // Align the top of the image with the top of the card
    left: 0, // Align the left of the image with the left of the card
  },
  agencyNameText: {
    fontSize: 16, // Font size for readability
    fontFamily: fonts.primary.medium,
    color: Colors.light.background, // White text for better contrast
    textAlign: 'center',
    position: 'absolute', // Position text absolutely
    bottom: 0, // Position text at the bottom of the card
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text
    width: '100%', // Full width for text background
    paddingVertical: 5, // Padding for text
  },

  // Underline Style (if needed)
  underline: {
    height: 1,
    backgroundColor: '#E0E0E0', // Light gray color for the underline
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },

  // Modal Styles
  modalContainer: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
    borderRadius: 20,
    padding: 20,
    zIndex: 1000,
    elevation: 10, // Adds shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalCloseText: {
    color: Colors.light.primaryBtn,
    fontSize: 16,
    fontFamily: fonts.primary.bold,
  },
  applyFilterButton: {
    marginTop: 20,
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyFilterText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.primary.bold,
  },
});

export default styles;
