import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PropertyDetails from './PropertyDetails';
import MapComponent from './MapComponent';
import GreenBar from './GreenBar'; // Import the GreenBar component
import DescriptionBox from './DescriptionBox'; // Import the DescriptionBox component
import PropertyFeatures from './PropertyFeatures';
import AdInfo from './AdInfo';
import AgencyDetails from './AgencyDetails'

const { width: screenWidth } = Dimensions.get('window');

interface ModalContentProps {
  expandedHeight: number;
  scrollOffsetY: any;
}

const ModalContent: React.FC<ModalContentProps> = ({
  expandedHeight,
  scrollOffsetY,
}) => {
  return (
    <ScrollView
      style={[styles.modalScrollView, { maxHeight: expandedHeight - 110 }]}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={true}
      onScroll={(event) => {
        scrollOffsetY.current = event.nativeEvent.contentOffset.y;
      }}
      scrollEventThrottle={16}
    >
      {/* Moved header elements to the top of ModalContent */}
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

      <PropertyDetails />
      <DescriptionBox />
      <MapComponent />
      <PropertyFeatures />
      <AdInfo />
      <AgencyDetails />

     
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
    marginTop: -40,
  },
  leftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Jost',
  },
  rightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Jost',
  },
  priceContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Jost',
    color: '#000',
  },
  detailsText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Jost',
    marginBottom: 20,
  },
  descriptionBox: {
    marginBottom: 20, // Ensures consistent spacing with detailsText and MapComponent
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Jost',
    color: '#000',
  },
  square: {
    width: '100%',
    height: 100,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
});

export default ModalContent;
