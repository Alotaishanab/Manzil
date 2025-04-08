import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { Colors } from '@colors'; // Assuming you have Colors in your theme
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopIcons from '../propertyscreen/components/TopIcons';
import { GenericModal, ReportAdModal } from '@components'; // Ensure the path is correct
import { Swipeable, TapGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import Icon library

const { height: windowHeight } = Dimensions.get('window');

export const PropertyFullScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isReportAdModalVisible, setReportAdModalVisible] = useState(false);

  const [savedProperties, setSavedProperties] = useState([]);

  const handleShare = () => {
    Alert.alert('Share', 'Share this property with others.');
  };

  // Function to toggle ReportAdModal visibility
  const toggleReportAdModal = () => {
    setReportAdModalVisible(!isReportAdModalVisible);
  };

  const exploreList = [
    {
      id: 1,
      price: 1012682,
      location: 'Melissastad, Serbia',
      beds: 4,
      baths: 2,
      size: '1521 sq ft',
      images: [{ uri: 'https://via.placeholder.com/800x1600?text=Property+1' }],
    },
    {
      id: 2,
      price: 1440976,
      location: 'East Justin, Greece',
      beds: 5,
      baths: 3,
      size: '1279 sq ft',
      images: [{ uri: 'https://via.placeholder.com/800x1600?text=Property+2' }],
    },
    {
      id: 3,
      price: 755131,
      location: 'Allenhaven, Congo',
      beds: 4,
      baths: 3,
      size: '1773 sq ft',
      images: [{ uri: 'https://via.placeholder.com/800x1600?text=Property+3' }],
    },
    {
      id: 4,
      price: 2000000,
      location: 'New City, Country',
      beds: 3,
      baths: 2,
      size: '1500 sq ft',
      images: [{ uri: 'https://via.placeholder.com/800x1600?text=Property+4' }],
    },
    {
      id: 5,
      price: 3500000,
      location: 'Old Town, Country',
      beds: 5,
      baths: 4,
      size: '2500 sq ft',
      images: [{ uri: 'https://via.placeholder.com/800x1600?text=Property+5' }],
    },
    // Add more properties as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // For heart animation
  const heartAnimationValues = useRef(
    exploreList.reduce((acc, item) => {
      acc[item.id] = new Animated.Value(0);
      return acc;
    }, {})
  ).current;

  const handleDoubleTap = (propertyId) => {
    const property = exploreList.find((item) => item.id === propertyId);
    if (property) {
      handleSaveProperty(property);
      animateHeart(propertyId);
    }
  };

  const animateHeart = (propertyId) => {
    heartAnimationValues[propertyId].setValue(0);

    Animated.timing(heartAnimationValues[propertyId], {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const handleSaveProperty = (property) => {
    if (!savedProperties.includes(property.id)) {
      setSavedProperties([...savedProperties, property.id]);
      // Optionally, remove the alert to avoid interruption
      // Alert.alert('Property Saved', `${property.location} has been saved!`);
    } else {
      // Alert.alert('Already Saved', `${property.location} is already saved.`);
    }
  };

  const renderRightActions = (progress, dragX) => (
    <View style={styles.rightAction}>
      <Icon name="heart" size={30} color="#fff" />
      <Text style={styles.actionText}>Save</Text>
    </View>
  );

  const renderLeftActions = (progress, dragX) => (
    <View style={styles.leftAction}>
      <Icon name="flag" size={30} color="#fff" />
      <Text style={styles.actionText}>Report</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const isSaved = savedProperties.includes(item.id);
    const heartScale = heartAnimationValues[item.id].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1.2, 1],
    });

    const heartOpacity = heartAnimationValues[item.id].interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => handleSaveProperty(item)}
        renderLeftActions={renderLeftActions}
        onSwipeableLeftOpen={() => toggleReportAdModal()}
      >
        <View style={{ height: windowHeight }}>
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                handleDoubleTap(item.id);
              }
            }}
            numberOfTaps={2}
          >
            <View style={{ flex: 1 }}>
              <ImageBackground
                source={item.images[0]}
                style={styles.imageBackground}
                resizeMode="cover"
              >
                {/* Heart Animation */}
                <Animated.View
                  style={[
                    styles.heartContainer,
                    {
                      opacity: heartOpacity,
                      transform: [{ scale: heartScale }],
                    },
                  ]}
                >
                  <Icon name="heart" size={100} color="white" />
                </Animated.View>

                <View style={styles.infoOverlay}>
                  <Text style={styles.price}>﷼{item.price}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                  <Text style={styles.info}>
                    {item.beds} Beds • {item.baths} Baths • {item.size}
                  </Text>
                  {isSaved && (
                    <View style={styles.savedBadge}>
                      <Text style={styles.savedText}>Saved</Text>
                    </View>
                  )}
                </View>
              </ImageBackground>
            </View>
          </TapGestureHandler>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top + 15 }]}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../../assets/images/close.png')}
          style={styles.closeIconImage}
        />
      </TouchableOpacity>

      <TopIcons
        topInset={insets.top}
        onSavePress={() => Alert.alert('Save', 'Save functionality is not implemented yet.')}
        onSharePress={handleShare}
        onReportPress={toggleReportAdModal}
      />

      {/* Property List (TikTok-style scrolling) */}
      <Animated.FlatList
        ref={flatListRef}
        data={exploreList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / windowHeight);
          setCurrentIndex(index);
        }}
        snapToInterval={windowHeight}
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: windowHeight,
          offset: windowHeight * index,
          index,
        })}
      />

      {/* ReportAdModal for reporting ads */}
      {isReportAdModalVisible && (
        <View style={styles.reportAdModalOverlay}>
          <ReportAdModal
            isVisible={isReportAdModalVisible}
            toggleVisible={toggleReportAdModal}
            style={styles.reportAdModalVisible}
          />
        </View>
      )}

      {/* Generic Modal, if still needed */}
      {isModalVisible && (
        <GenericModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  infoOverlay: {
    padding: 15,
    position: 'absolute',
    bottom: 100,
    left: 15,
    right: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // For better readability
  },
  price: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  info: {
    color: '#fff',
    fontSize: 20,
  },
  savedBadge: {
    backgroundColor: 'rgba(0, 128, 0, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  savedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    zIndex: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  rightAction: {
    backgroundColor: '#00BFA5', // Teal color
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
    flexDirection: 'column',
  },
  leftAction: {
    backgroundColor: '#D32F2F', // Red color
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
    flexDirection: 'column',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 5,
  },
  heartContainer: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    zIndex: 100,
    // Adjust the position as needed
  },
  reportAdModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Backdrop effect
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200, // Higher than any other component
  },
  reportAdModalVisible: {
    zIndex: 201, // Even higher than the overlay to be safe
  },
});

export default PropertyFullScreen;
