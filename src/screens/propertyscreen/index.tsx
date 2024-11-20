import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import HapticFeedback from 'react-native-haptic-feedback';
import { useGetPropertyById } from '@services';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ImageGallery from './components/ImageGallery';
import TopIcons from './components/TopIcons';
import { GenericModal, ReportAdModal } from '@components';
import ModalContent from './components/ModalContent';
import ContactButton from './components/ContactButton';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const PropertyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { propertyId } = route.params;

  const bottomSheetRef = useRef(null);
  const scrollViewRef = useRef(null);
  const scrollOffsetY = useRef({ current: 0 });

  const snapPoints = ['33%', '83%'];
  const [isReportAdModalVisible, setReportAdModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const { data: property, isLoading, error } = useGetPropertyById(propertyId);

  useEffect(() => {
    if (error) {
      console.log("Error fetching property:", error);
      Alert.alert("Error", "Failed to load property details.");
    }

    if (property) {
      console.log("Fetched Property Data:", property); // Log the property data
    }
  }, [property, error]);

  const handleShare = () => {
    Alert.alert("Share", "Share this property with others.");
  };

  const handleTermsClick = () => {
    navigation.navigate('TermsOfUse');
  };

  const toggleReportAdModal = () => {
    setReportAdModalVisible(!isReportAdModalVisible);
  };

  const handleBottomSheetChange = (index) => {
  setIsBottomSheetExpanded(index === 1);
  
  if (index === 0 && scrollViewRef.current) {
    // Ensure the scroll position resets after the modal animation completes
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }, 300); // Adjust delay if needed to ensure the animation completes
  }
  
  HapticFeedback.trigger('impactLight');
};


  const category = property?.category || "Apartment";
  const type = property?.type || "Sell";
  const displayType = type === 'Sell' ? 'For Sale' : type === 'Rent' ? 'For Rent' : type;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : property ? (
        <>

        
          <TouchableOpacity
            style={[styles.closeButton, { top: insets.top + 15 }]}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../../assets/images/close.png')} style={styles.closeIconImage} />
          </TouchableOpacity>

          <TopIcons 
            topInset={insets.top} 
            onSavePress={() => Alert.alert("Save", "Save functionality is not implemented yet.")}
            onSharePress={handleShare}
            onReportPress={toggleReportAdModal}
          />

<ImageGallery
  images={property.property_images} // Pass actual image URLs
  expandedHeight={screenHeight * 0.8}
  onPlaceholderClick={(index) => console.log(`Clicked on image ${index}`)}
/>

        
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
            onChange={handleBottomSheetChange}
            handleIndicatorStyle={{ backgroundColor: '#aaa', width: 40, height: 5, borderRadius: 2.5 }}
            handleComponent={() => (
              <View style={styles.slipSection}>
                <Text style={styles.leftText}>{category}</Text> 
                <Text style={styles.rightText}>{displayType}</Text> 
              </View>
            )}
          >
            <BottomSheetScrollView
              ref={scrollViewRef}
              style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
              scrollEnabled={isBottomSheetExpanded} // Disable scrolling when collapsed
            >
              <ModalContent
                property={property}
                expandedHeight={screenHeight * 0.8}
                isExpanded={isBottomSheetExpanded}
                scrollOffsetY={scrollOffsetY}
                scrollViewRef={scrollViewRef}
                handleTermsClick={handleTermsClick}
              />
            </BottomSheetScrollView>
          </BottomSheet>


          {isReportAdModalVisible && (
            <View style={styles.reportAdModalOverlay}>
              <ReportAdModal
                isVisible={isReportAdModalVisible}
                toggleVisible={toggleReportAdModal}
                style={styles.reportAdModalVisible}
              />
            </View>
          )}

          {isModalVisible && (
            <GenericModal
              visible={isModalVisible}
              onClose={() => setModalVisible(false)}
            />
          )}
        </>
      ) : (
        <Text style={styles.errorMessage}>Property details could not be loaded.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
  reportAdModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  reportAdModalVisible: {
    zIndex: 201,
  },
  errorMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  slipSection: {
    height: 35,
    backgroundColor: 'green',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: screenWidth - 20,
    alignSelf: 'center',
    marginTop: -30,
    zIndex: 102,
  },
  leftText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Jost',
  },
  rightText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Jost',
  },
  
});

export default PropertyScreen;
