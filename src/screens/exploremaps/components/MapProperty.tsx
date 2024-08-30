import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import PropertyCard from '../../../components/molecules/PropertyCard'; // Import PropertyCard
import { fonts } from '../../../assets/fonts/index';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const { width: screenWidth } = Dimensions.get('window');

interface ModalContentProps {
  expandedHeight: number;
  scrollOffsetY: any;
}

const ModalContent: React.FC<ModalContentProps> = ({
  expandedHeight,
  scrollOffsetY,
}) => {
  const navigation = useNavigation(); // Initialize navigation

  // Sample data for similar homes
  const similarHomesData = [
    {
      id: '1',
      title: 'Luxury Villa',
      price: 3500000,
      location: 'Al Olaya, Riyadh',
      beds: 5,
      baths: 3,
      size: '2,500 sqft',
      imageUrl: 'https://via.placeholder.com/150',
      dateAdded: '09/05/2024',
    },
    {
      id: '2',
      title: 'Modern Apartment',
      price: 1800000,
      location: 'King Abdullah District, Riyadh',
      beds: 3,
      baths: 2,
      size: '1,200 sqft',
      imageUrl: 'https://via.placeholder.com/150',
      dateAdded: '08/10/2024',
    },
    {
      id: '3',
      title: 'Cozy House',
      price: 2000000,
      location: 'Al Nakheel, Riyadh',
      beds: 4,
      baths: 3,
      size: '1,800 sqft',
      imageUrl: 'https://via.placeholder.com/150',
      dateAdded: '07/12/2024',
    },
    // Add more similar homes data as needed
  ];

  // Navigation handler for PropertyCard clicks
  const handleCard = () => {
    navigation.navigate('PropertyScreen');
  };

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

        {/* FlatList to render similar homes */}
        <View style={styles.similarHomesSection}>
          <Text style={styles.sectionTitle}>Similar Homes</Text>
          <FlatList
            data={similarHomesData}
            renderItem={({ item }) => (
              <PropertyCard 
                item={item} 
                handleClick={handleCard} // Pass the navigation handler
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal={true} // Display the list horizontally
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
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
});

export default ModalContent;
