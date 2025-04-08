import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@colors';

const { width } = Dimensions.get('window'); // Get the device width to calculate card size

const cardMargin = 10; // Adjusted margin for consistency
const cardWidth = (width - cardMargin * 3) / 2; // Calculate width based on margins and screen width

export const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: cardMargin, // Center the container within the screen
  },
  fullWidthCard: {
    width: width - 2 * cardMargin, // Full width for the large card
    marginBottom: cardMargin,
    alignSelf: 'center', // Center the chart
  },
  halfWidthCard: {
    width: cardWidth, // Half width for the two cards in the second row
    height: cardWidth, // Square shape
    marginBottom: cardMargin,
    marginHorizontal: cardMargin / 2, // Keep half margin between cards
  },
  thirdRowCard: {
    width: (width - 4 * cardMargin) / 3, // One-third width for the three smaller cards in the third row
    height: (width - 4 * cardMargin) / 3, // Square shape
    marginBottom: cardMargin,
    marginHorizontal: cardMargin / 2, // Keep half margin between cards
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 12, // Increase padding for more space inside the card
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: '#ffffff', // Set white color for all boxes
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  textContent: {
    alignItems: 'center',
  },
  metricName: {
    fontSize: 14,
    color: Colors.light.headingTitle,
    textAlign: 'center',
    marginVertical: 2,
  },
  metricValue: {
    fontSize: 24,
    color: Colors.light.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 2,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  metricPercent: {
    marginLeft: 4,
    fontSize: 12,
  },
  metricPeriod: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.light.subtext,
  },
  separatorLine: {
    width: '90%',
    height: 1,
    backgroundColor: Colors.light.border,
    alignSelf: 'center',
    marginVertical: 20,
  },
  userLocationContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  userLocationTitle: {
    fontSize: 18,
    color: Colors.light.headingTitle,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    marginVertical: 5,
  },
  locationText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  locationValue: {
    fontSize: 14,
    color: Colors.light.success,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 5, // Reduce vertical margin between rows
  },
  centeredButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  clickableText: {
    color: '#28a745', // Green color for the clickable text
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  LastText: {
    color: '#28a745', // Green color for the clickable text
    fontSize: 18,
    fontWeight: 'bold',
  },
  separatorLine: {
    height: 1,            // Height of the line
    backgroundColor: '#28a745', // Line color (light gray)
    width: '100%',        // Full width of the parent container
    marginVertical: 20,   // Margin around the line for spacing
  },  
  totalViewsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
    marginLeft: 20,
  },  
});

export const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // Ensures the modal is aligned at the bottom
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300, // Adjust as necessary
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute circles evenly
    alignItems: 'center',
    width: '100%',
  },
  modalOptionCircle: {
    width: 60, // Smaller circle size
    height: 60, // Smaller circle size
    borderRadius: 30,
    backgroundColor: '#28a745', // Green color for modal buttons
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Adjust spacing between circles
  },
  modalOptionText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  statisticsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingVertical: 10,
  },
  selectedDataContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  selectedDataValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#228B22', // Dark green for data value
  },
  selectedDataLabel: {
    fontSize: 14,
    color: '#666', // Gray for data label
    marginTop: 4,
  },
  totalViewsContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  totalViewsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Black for total views
  },
  totalViewsLabel: {
    fontSize: 14,
    color: '#666', // Gray for total views label
    marginTop: 4,
  },
  fullWidthCard: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});
