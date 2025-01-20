import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PropertyDetails from './PropertyDetails';
import MapComponent from './MapComponent';
import GreenBar from './GreenBar';
import DescriptionBox from './DescriptionBox';
import PropertyFeatures from './PropertyFeatures';
import AdInfo from './AdInfo';
import AgentDetails from './AgentDetails';
import TimetoAddress from './TimeToAddress';
import Utilities from './Utilities';
import { SimilarProperties } from '@screens';
import { fonts } from '../../../assets/fonts/index';
import { useNavigation } from '@react-navigation/native';
import { renderPropertyIcons } from '../../../../src/helpers/renderPropertyIcons'; 
const { width: screenWidth } = Dimensions.get('window');

interface ModalContentProps {
  property: any; // Add this prop to receive the property data
  expandedHeight: number;
  scrollOffsetY: any;
  scrollViewRef: React.RefObject<ScrollView>;
  isExpanded: boolean;
  handleTermsClick: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
  property,
  expandedHeight,
  scrollOffsetY,
  scrollViewRef,
  isExpanded,
  handleTermsClick,
}) => {
  const navigation = useNavigation();

  const handleCardClick = (propertyId: string) => {
    console.log('Card clicked!', propertyId);
    navigation.navigate('PropertyScreen', { propertyId });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[styles.modalScrollView, { maxHeight: expandedHeight }]}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={true}
      scrollEnabled={isExpanded}
      onScroll={(event) => {
        scrollOffsetY.current = event.nativeEvent.contentOffset.y;
      }}
      scrollEventThrottle={16}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        {/* Drag Icon */}
        <View style={styles.dragIcon} />
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{`${property.price.toLocaleString()}﷼`}</Text>

          {/* Render the property icons */}
          <View style={styles.iconContainer}>
            {renderPropertyIcons(property)}
          </View>
          
          <Text style={styles.detailsText}>{property.address}</Text>
        </View>

        {/* Add margin to lower the GreenBar */}
        <GreenBar style={styles.greenBar} />
      </View>

      <View style={styles.contentContainer}>
      <PropertyDetails
  title={property.title}
  area={property.area}
  bathrooms={property.bathrooms}
  bedrooms={property.bedrooms}
  livingRooms={property.living_rooms}
  propertyCategory={property.property_category}
  listingDate={property.listing_date}
/>



<Utilities 
  hasWater={property.has_water}
  hasElectricity={property.has_electricity}
  hasSewage={property.has_sewage}
/>

       
<DescriptionBox 
  description={property.description}

/>

        <MapComponent location={property.location} />
        <TimetoAddress/>
        <AdInfo property={property} />
        <AgentDetails property={property} />

        <View style={styles.similarHomesSection}>
          <Text style={styles.sectionTitle}>Similar Properties</Text>
          <SimilarProperties handleClick={handleCardClick} />

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
    position: 'relative',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  dragIcon: {
    width: 75,
    height: 3,
    backgroundColor: '#aaa',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10, // Adds spacing above and below the icon
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceText: {
    fontSize: 32,
    fontFamily: fonts.primary.bold,
    color: '#000',
  },
  iconContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  detailsText: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.primary.regular,
    marginBottom: 20,
  },
  greenBar: {
    marginTop: 10, // Adjust this value to lower the GreenBar
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 30,
  },
  propertyFeatures: {
    marginTop: 20,
  },
  descriptionBox: {
    marginBottom: 20,
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
