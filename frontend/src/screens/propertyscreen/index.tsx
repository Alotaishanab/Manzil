import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  View,
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const PropertyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { propertyId } = route.params;

  const bottomSheetRef = useRef<any>(null);
  const scrollViewRef = useRef<any>(null);
  const scrollOffsetY = useRef({ current: 0 });

  const snapPoints = ['33%', '83%'];
  const [isReportAdModalVisible, setReportAdModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  // IMPORTANT: Since your API now nests property details,
  // update how you merge media.
  const { data: property, isLoading, error } = useGetPropertyById(propertyId);

  useEffect(() => {
    if (error) {
      console.log("Error fetching property:", error);
      Alert.alert("Error", "Failed to load property details.");
    }
    if (property) {
      console.log("Fetched Property Data:", JSON.stringify(property, null, 2));
    }
  }, [property, error]);

  // Merge images and videos from the nested property_details.
  const allMedia = property
    ? [
        ...(property.property_details.property_images || []),
        ...(property.property_details.property_videos || []),
      ]
    : [];

  const handleShare = () => {
    Alert.alert("Share", "Share this property with others.");
  };

  const handleTermsClick = () => {
    navigation.navigate('TermsOfUse');
  };

  const toggleReportAdModal = () => {
    setReportAdModalVisible(!isReportAdModalVisible);
  };

  const handleBottomSheetChange = (index: number) => {
    setIsBottomSheetExpanded(index === 1);
    if (index === 0 && scrollViewRef.current) {
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
      }, 300);
    }
    HapticFeedback.trigger('impactLight');
  };

  // Use nested fields for category and type:
  const category = property?.property_details.property_category || "Apartment";
  const type = property?.property_details.property_type || "Sell";
  const displayType = type === 'Sell' ? 'For Sale' : type === 'Rent' ? 'For Rent' : type;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={screenWidth} height={screenHeight * 0.5} />
          <SkeletonPlaceholder.Item marginTop={20} width={screenWidth * 0.9} height={20} borderRadius={4} alignSelf="center" />
          <SkeletonPlaceholder.Item marginTop={10} width={screenWidth * 0.8} height={20} borderRadius={4} alignSelf="center" />
          <SkeletonPlaceholder.Item marginTop={10} width={screenWidth * 0.7} height={20} borderRadius={4} alignSelf="center" />
        </SkeletonPlaceholder>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {property ? (
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
            images={allMedia}
            expandedHeight={screenHeight * 0.8}
            onPlaceholderClick={(index) => console.log(`Clicked on media ${index}`)}
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
              scrollEnabled={isBottomSheetExpanded}
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
