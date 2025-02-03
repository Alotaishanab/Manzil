import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { Colors } from '../../../constants/Colors';
import { fonts } from '../../../assets/fonts/index';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface TimetoAddressProps {
  propertyAddress: string;
  destinationAddress: string;
  setDestinationAddress: (address: string) => void;
  handleCheckTravelTime: () => void;
  travelTime: string | null;
}

const TimetoAddress: React.FC<TimetoAddressProps> = ({
  propertyAddress,
  destinationAddress,
  setDestinationAddress,
  handleCheckTravelTime,
  travelTime,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [modalVisible, setModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([
    '123 Example Street',
    '456 Sample Avenue',
    '789 Demo Blvd',
    '101 Mock Lane',
    '234 Placeholder St',
    '567 Another Ave',
    '890 Some Road',
    '345 Mock Blvd',
    '678 Example Path',
    '910 Placeholder Ln',
  ]);

  // Initialize Animated Value properly
  const translateY = useRef(new Animated.Value(0)).current;

  const handleDestinationFocus = () => {
    setModalVisible(true);
  };

  const handleAddressSelect = (address: string) => {
    setDestinationAddress(address);
    setModalVisible(false);
  };

  // PanResponder for draggable modal
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          setModalVisible(false);
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Time to Address</Text>

        <View style={styles.headerContainer}>
          <Text style={styles.liveIndicator}>Live Now - {currentTime}</Text>
          {travelTime && (
            <Text style={styles.travelTimeText}>Estimated: {travelTime}</Text>
          )}
        </View>

        {/* Destination Address (Editable, triggers modal) */}
        <TouchableOpacity style={styles.searchBar} onPress={handleDestinationFocus}>
          <Text style={styles.searchPlaceholder}>
            {destinationAddress || 'Enter Destination Address'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Address Search */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY }] }]}
            {...panResponder.panHandlers}
          >
            {/* Close Icon */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require('../../../assets/images/close.png')} // Replace with your actual image path
                style={styles.closeIconImage}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.modalSearchBar}
              placeholder="Enter Destination Address"
              placeholderTextColor="#000"
              value={destinationAddress}
              onChangeText={(text) => {
                setDestinationAddress(text);
                // Simulate fetching addresses (Replace with actual fetching logic)
                setSearchResults([
                  '123 Example Street',
                  '456 Sample Avenue',
                  '789 Demo Blvd',
                  '101 Mock Lane',
                  '234 Placeholder St',
                  '567 Another Ave',
                  '890 Some Road',
                  '345 Mock Blvd',
                  '678 Example Path',
                  '910 Placeholder Ln',
                ]);
              }}
            />

            <FlatList
              data={searchResults.slice(0, 10)} // Only show the first 10 results
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity onPress={() => handleAddressSelect(item)}>
                    <Text style={styles.resultItem}>{item}</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </>
              )}
            />

            <Text style={styles.poweredByGoogle}>Powered by Google</Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default TimetoAddress;

// StyleSheet remains unchanged
const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  sectionContainer: {
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginVertical: 10,
    padding: 15,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  liveIndicator: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: '#888',
  },
  travelTimeText: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: Colors.primary,
  },
  searchBar: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 1,
  },
  searchPlaceholder: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: '#999',
  },
  checkTimeButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: screenHeight * 0.9, // 90% of the screen height
    width: screenWidth, // Full width
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    elevation: 5,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 23,
    right: 15,
    zIndex: 10,
  },
  closeIconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalSearchBar: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: screenWidth * 0.85, // Smaller width
    alignSelf: 'left',
  },
  resultItem: {
    fontSize: 14,
    paddingVertical: 10,
    fontFamily: fonts.primary.regular,
    color: '#333',
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc',
  },
  poweredByGoogle: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});
