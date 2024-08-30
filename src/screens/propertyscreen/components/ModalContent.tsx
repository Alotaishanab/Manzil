import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PropertyDetails from './PropertyDetails';
import MapComponent from './MapComponent';
import GreenBar from './GreenBar';
import DescriptionBox from './DescriptionBox';
import PropertyFeatures from './PropertyFeatures';
import AdInfo from './AdInfo';
import AgencyDetails from './AgencyDetails';
import { SimilarProperties } from '@screens'; // Ensure SimilarProperties component is imported correctly
import { fonts } from '../../../assets/fonts/index';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const { width: screenWidth } = Dimensions.get('window');

interface ModalContentProps {
  expandedHeight: number;
  scrollOffsetY: any;
  scrollViewRef: React.RefObject<ScrollView>;
  isExpanded: boolean; // New prop to determine if the modal is expanded
  handleTermsClick: () => void; // Add this prop to the interface
}

const ModalContent: React.FC<ModalContentProps> = ({
  expandedHeight,
  scrollOffsetY,
  scrollViewRef,
  isExpanded,
  handleTermsClick, // Destructure the prop
}) => {
  const navigation = useNavigation(); // Initialize navigation

  // Navigation handler for SimilarProperties clicks
  const handleCardClick = (propertyId: string) => {
    console.log('Card clicked!', propertyId); // Log to see if this function is triggered
    navigation.navigate('PropertyScreen', { propertyId }); // Navigate and pass property ID
  };

  console.log('Rendering ModalContent'); // Log to verify rendering

  return (
    <ScrollView
      ref={scrollViewRef} // Assign the ref to the ScrollView
      style={[styles.modalScrollView, { maxHeight: expandedHeight - 110 }]}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={true}
      scrollEnabled={isExpanded} // Disable scroll when the modal is collapsed
      onScroll={(event) => {
        scrollOffsetY.current = event.nativeEvent.contentOffset.y;
      }}
      scrollEventThrottle={16}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.dragIcon}></View>
        <View style={styles.slipSection}>
          <Text style={styles.leftText}>House</Text>
          <Text style={styles.rightText}>For Sale</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>﷼2,949,000</Text>
          <Text style={styles.detailsText}>4 beds | 2 baths | 1,863 sqft</Text>
          <Text style={styles.detailsText}>AlMalga, Riyadh</Text>
        </View>

        <GreenBar />
      </View>

      <View style={styles.contentContainer}>
        <PropertyDetails />
        <PropertyFeatures style={styles.propertyFeatures} />
        <DescriptionBox />
        <MapComponent />
        <AdInfo />
        <AgencyDetails />

        {/* Use SimilarProperties component directly */}
        <View style={styles.similarHomesSection}>
          <Text style={styles.sectionTitle}>Similar Properties</Text>
          {/* Directly render SimilarProperties with the handleClick prop */}
          <SimilarProperties handleClick={handleCardClick} />

          {/* Disclaimer Text */}
          <Text style={styles.disclaimerText}>
            Manzil makes every effort to provide accurate and up-to-date information on property listings. However, we are not responsible for any inaccuracies or discrepancies in the details provided. It is highly recommended to verify all property information directly with the listing agent or property owner. For more information, please review our{' '}
            <TouchableOpacity onPress={handleTermsClick}>
              <Text style={styles.termsText}>terms and conditions.</Text>
            </TouchableOpacity>.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalScrollView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  headerSection: {
    paddingTop: 0,
    paddingBottom: 0,
    position: 'relative',
    backgroundColor: 'white',
    marginTop: -55,
  },
  leftText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: fonts.primary.regular,
  },
  rightText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: fonts.primary.regular,
  },
  priceContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 32,
    fontFamily: fonts.primary.regular,
    color: '#000',
  },
  detailsText: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.primary.regular,
    marginBottom: 20,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  propertyFeatures: {
    marginTop: 20,
  },
  descriptionBox: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.primary.regular,
    color: '#000',
  },
  square: {
    width: '100%',
    height: 100,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  similarHomesSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.primary.regular,
    color: '#000',
    marginBottom: 10,
  },
  flatListContent: {
    paddingLeft: 10,
  },
  disclaimerText: {
    marginTop: 15,
    fontSize: 12,
    fontFamily: fonts.primary.medium,
    color: 'black',
    textAlign: 'left',
    paddingHorizontal: 15,
    lineHeight: 18,
  },
  termsText: {
    textDecorationLine: 'underline',
    fontSize: 12,
    fontFamily: fonts.primary.medium,
    color: '#5389fe',
    paddingHorizontal: 15,
    marginTop: 15,
    lineHeight: 18,
  },
});

export default ModalContent;
