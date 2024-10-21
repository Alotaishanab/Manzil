// Import Statements
import React, { useState, useCallback, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Use Google Maps provider
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@colors'; // Assuming you're using a Colors object for styling
import { fonts } from '../../assets/fonts/index'; // Importing fonts
import { MapTabIcon, ThreeDMapIcon, SatelliteIcon } from '@svgs';

// Get Screen Height
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Example location data for modal content
const locations = [
  { id: '1', name: 'Coffee Shop', distance: '0.5 miles' },
  { id: '2', name: 'Grocery Store', distance: '1.2 miles' },
  { id: '3', name: 'Gym', distance: '0.9 miles' },
];

// Placeholder API call function
const checkTravelTime = async (origin, destination) => {
  // Replace this with your actual API call
  // For demonstration, return a mocked travel time
  // In real implementation, use fetch or axios to call your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('15 mins');
    }, 2000);
  });
};

// Define haptic feedback options
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};



export const MapScreen = ({ visible, onClose }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mainMapType, setMainMapType] = useState('standard'); // State for main map type
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  const [destinationAddress, setDestinationAddress] = useState('');
  const [travelTime, setTravelTime] = useState(null);
  const propertyAddress = '123 Main St, San Francisco, CA'; // Pre-filled address
  const navigation = useNavigation(); // React Navigation hook


  // Handle map press to place or move marker
  const handleMapPress = useCallback((event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate); // Update marker position instantly
  }, []);

  // Function to navigate back
const handleClose = () => {
  navigation.goBack();
};

  // Define modal position boundaries
  const minTop = SCREEN_HEIGHT * 0.4; // 5% from top
  const maxTop = SCREEN_HEIGHT * 0.8;  // 30% from top

  // Shared value for the modal's top position
  const translateY = useSharedValue(maxTop);

  // Reset modal position when it becomes visible
  useEffect(() => {
    if (visible) {
      translateY.value = maxTop;
    }
  }, [visible, maxTop, translateY]);

  // Gesture handler to update translateY based on user drag
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      let newY = ctx.startY + event.translationY;
      // Clamp the value between minTop and maxTop
      newY = Math.max(minTop, Math.min(newY, maxTop));
      translateY.value = newY;
    },
    onEnd: () => {
      // Snap to nearest position (minTop or maxTop)
      if (translateY.value < (minTop + maxTop) / 2) {
        translateY.value = withSpring(minTop);
      } else {
        translateY.value = withSpring(maxTop);
      }
    },
  });

  // Animated style for the modal
  const animatedStyle = useAnimatedStyle(() => ({
    top: translateY.value,
  }));

  // Handle category selection
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    // Implement your category filtering logic here
    // For example, fetch locations of the selected category from backend
  };

  // Handle travel time check
  const handleCheckTravelTime = async () => {
    if (destinationAddress.trim() === '') {
      alert('Please enter a destination address.');
      return;
    }

    try {
      const time = await checkTravelTime(propertyAddress, destinationAddress);
      setTravelTime(time);
    } catch (error) {
      console.error('Error fetching travel time:', error);
      alert('Failed to fetch travel time. Please try again.');
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Main Map View */}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            onPress={handleMapPress}
            mapType={mainMapType}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {markerPosition && (
              <Marker
                key={`${markerPosition.latitude}-${markerPosition.longitude}`}
                coordinate={markerPosition}
                pinColor="green"
              />
            )}
            {/* Optionally, add markers based on selected category */}
          </MapView>

          {/* Close Button */}
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
      <Image
        source={require('../../assets/images/close.png')}
        style={styles.closeIconImage}
      />
    </TouchableOpacity>

          {/* Draggable Modal */}
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.modalContent, animatedStyle]}>
              {/* Drag Indicator at the Top */}
              <View style={styles.dragIndicatorContainer}>
                <View style={styles.dragIndicator} />
              </View>

              {/* Modal Header */}
<View style={styles.modalHeader}>
  <Text style={styles.modalTitle}>Map View</Text>
</View>


            {/* Map Type Buttons */}
<View style={styles.mapTypeButtons}>
  <TouchableOpacity
    style={[
      styles.mapTypeButton,
      mainMapType === 'standard' && styles.activeMapTypeButton,
    ]}
    onPress={() => {
      ReactNativeHapticFeedback.trigger("impactLight", hapticOptions);
      setMainMapType('standard');
    }}
    activeOpacity={0.7}
    accessibilityLabel="Normal Map View"
    accessibilityRole="button"
  >
    <MapTabIcon size={24} color={mainMapType === 'standard' ? '#fff' : '#333'} />
    <Text style={[
      styles.buttonText,
      mainMapType === 'standard' && styles.activeButtonText
    ]}>Normal</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.mapTypeButton,
      mainMapType === 'satellite' && styles.activeMapTypeButton,
    ]}
    onPress={() => {
      ReactNativeHapticFeedback.trigger("impactLight", hapticOptions);
      setMainMapType('satellite');
    }}
    activeOpacity={0.7}
    accessibilityLabel="Satellite Map View"
    accessibilityRole="button"
  >
    <SatelliteIcon size={24} color={mainMapType === 'satellite' ? '#fff' : '#333'} />
    <Text style={[
      styles.buttonText,
      mainMapType === 'satellite' && styles.activeButtonText
    ]}>Satellite</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.mapTypeButton,
      mainMapType === 'hybrid' && styles.activeMapTypeButton,
    ]}
    onPress={() => {
      ReactNativeHapticFeedback.trigger("impactLight", hapticOptions);
      setMainMapType('hybrid');
    }}
    activeOpacity={0.7}
    accessibilityLabel="3D Map View"
    accessibilityRole="button"
  >
    <ThreeDMapIcon size={24} color={mainMapType === 'hybrid' ? '#fff' : '#333'} />
    <Text style={[
      styles.buttonText,
      mainMapType === 'hybrid' && styles.activeButtonText
    ]}>3D</Text>
  </TouchableOpacity>
</View>



              {/* Search Nearby Section */}
<View style={styles.sectionContainer}>
  <Text style={styles.sectionTitle}>Search Nearby</Text>
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={[
      { id: '1', name: 'Schools' },
      { id: '2', name: 'Mosques' },
      { id: '3', name: 'Groceries' },
      // Add more categories if needed
    ]}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategoryPress(item.name.toLowerCase())}
        activeOpacity={0.7}
        accessibilityLabel={`Search ${item.name}`}
        accessibilityRole="button"
      >
        <Text style={styles.categoryButtonText}>{item.name}</Text>
      </TouchableOpacity>
    )}
    contentContainerStyle={styles.flatListContainer}
  />
</View>

{/* Separator */}
<View style={styles.sectionSeparator} />

{/* Time to Location Section */}
<View style={styles.sectionContainer}>
  <Text style={styles.sectionTitle}>Time to Location</Text>
  {/* Property Address (Non-editable) */}
  <View style={[styles.searchBarContainer, { marginBottom: 15 }]}>
    <Text style={styles.searchLabel}>From:</Text>
    <TextInput
      style={[styles.searchBar, styles.disabledSearchBar]}
      value={propertyAddress}
      editable={false}
      placeholder="Property Address"
    />
  </View>
  {/* Destination Address (Editable) */}
  <View style={styles.searchBarContainer}>
    <Text style={styles.searchLabel}>To:</Text>
    <TextInput
      style={styles.searchBar}
      value={destinationAddress}
      onChangeText={setDestinationAddress}
      placeholder="Enter Destination Address"
    />
  </View>
  {/* Check Travel Time Button */}
  <TouchableOpacity
    style={[styles.checkTimeButton, { marginTop: 15 }]}
    onPress={handleCheckTravelTime}
    activeOpacity={0.7}
  >
    <Text style={styles.checkTimeButtonText}>Check Time</Text>
  </TouchableOpacity>
  {/* Display Travel Time */}
  {travelTime && (
    <Text style={styles.travelTimeText}>
      Travel Time: {travelTime}
    </Text>
  )}
</View>


            </Animated.View>
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  // Map Styles
  map: {
    flex: 1,
  },
  // Close Button Styles
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeIconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    fontFamily: fonts.primary.bold, // Using imported fonts
  },
  // Modal Content Styles
  modalContent: {
    position: 'absolute',
    height: SCREEN_HEIGHT, // Full screen height to allow dragging between minTop and maxTop
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 30,
    alignSelf: 'center',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden', // Prevent content overflow
  },

  // Drag Indicator Styles
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragIndicator: {
    width: 60,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },

  // Modal Header Styles
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the title horizontally
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: fonts.primary.bold, // Using imported fonts
  },

  mapTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Evenly distribute buttons
    marginHorizontal: 20,
    marginBottom: 25,
  },
  mapTypeButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1, // Added to apply border even when not selected
    borderColor: '#ddd', // Default border color
  },  
  activeMapTypeButton: {
    backgroundColor: '#333', // Darker background when active
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: '#333',
    marginLeft: 8, // Space between icon and text
  },
  activeButtonText: {
    color: '#fff', // White text on active button
  },

  categoriesContainer: {
    height: 80, // Set a fixed height that matches the buttons
    marginHorizontal: 20,
    marginBottom: 15,
    overflow: 'hidden', // Ensure content stays within the container
    justifyContent: 'center', // Center the buttons vertically within the container
  },

  timeToLocationContainer: {
    paddingHorizontal: 20, // Consistent padding for neat layout
    paddingBottom: 15,
    borderTopWidth: 1, // Divider from above sections
    borderColor: '#eee',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Lighter background
    padding: 5,
    borderRadius: 15,
    marginVertical: 5, // More space between input sections
  },
  searchLabel: {
    width: 40,
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: '#333',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    backgroundColor: '#fff',
  },
  disabledSearchBar: {
    backgroundColor: '#f0f0f0',
  },
  checkTimeButton: {
    backgroundColor: Colors.primary, // Assuming Colors.primary is defined
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkTimeButtonText: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: '#fff',
  },
  travelTimeText: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#333',
    marginBottom: 10,
  },
  
  flatListContainer: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  
  categoryButton: {
    backgroundColor: '#f5f5f5',
    width: 80, // Adjust width as needed
    height: 80, // Adjust height to keep buttons even
    borderRadius: 40, // Circular button
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Adds spacing between buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: Colors.primary, // Adds border to indicate selected state
    borderWidth: 2,
  },
  
  activeCategoryButton: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight, // Highlight selected button
  },
  
  categoryButtonText: {
    fontSize: 12,
    fontFamily: fonts.primary.bold,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  
  sectionSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  
});
