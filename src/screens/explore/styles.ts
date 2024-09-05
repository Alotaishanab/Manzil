import { StyleSheet } from 'react-native';
import { Colors } from '@colors';
import { width } from '../../hooks/useDimension';
import { fonts } from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  filterSquareBtn: {
    borderWidth: 1.5,
    borderRadius: 17,
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
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
  topAgencyWrap: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    paddingBottom: 20, // Added padding for bottom
  },
  topAgencyText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
    fontSize: 20,
  },
  sellAll: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 13,
  },
  agencyBtn: {
    width: width * 0.45, // Set a fixed width for each card
    height: 180, // Adjusted height for card size
    borderRadius: 15, // Border radius for smooth edges
    marginRight: 15, // Margin for spacing between cards
    overflow: 'hidden', // Ensure content doesn't spill over rounded corners
    backgroundColor: '#fff',
    borderColor: '#ccc', // Light gray border color for distinction
    borderWidth: 1, // Thickness of the border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, // Increased shadow opacity for more depth
    shadowRadius: 6, // Increased shadow radius for a softer shadow
    elevation: 4, // Slightly increased elevation for better depth
  },
  agencyImg: {
    width: '100%', // Full width to cover the card
    height: '100%', // Full height to cover the card
    resizeMode: 'contain', // Contain image within card dimensions
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
});
