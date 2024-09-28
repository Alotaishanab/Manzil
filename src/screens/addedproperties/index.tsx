import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../assets/fonts/index';
import { PropertyCardSimpleWithAnalytics } from '@components';
import { Colors } from '@colors';

const { width: screenWidth } = Dimensions.get('window');

// Sample data for added properties
export const addedPropertiesData = [
  {
    id: '1',
    title: 'Shop in Dammam',
    price: 3500000,
    views: 300,
    saves: 120,
    clicks: 85,
    imageUrl: 'https://via.placeholder.com/150',
    dateAdded: '09/05/2024',
  },
  {
    id: '2',
    title: 'Warehouse in Makkah',
    price: 1800000,
    views: 200,
    saves: 80,
    clicks: 60,
    imageUrl: 'https://via.placeholder.com/150',
    dateAdded: '08/10/2024',
  },
  {
    id: '3',
    price: 2000000,
    views: 250,
    saves: 100,
    clicks: 75,
    imageUrl: 'https://via.placeholder.com/150',
    dateAdded: '07/12/2024',
  },
];

export const AddedProperties = () => {
  const navigation = useNavigation(); // Initialize navigation

  const handleViewAnalytics = (propertyId) => {
    console.log(`Viewing analytics for property ID: ${propertyId}`);
    // Navigation to analytics screen can be implemented here
  };

  const handlePropertyClick = () => {
    console.log('Property card clicked. Navigating to PropertyScreen.');
    navigation.navigate('PropertyScreen'); // Navigate to PropertyScreen when a card is clicked
  };

  const renderPropertyItem = ({ item }) => (
    <View style={styles.propertyCard}>
      <PropertyCardSimpleWithAnalytics
        item={item}
        handleClick={() => {
          console.log(`Clicked on property: ${item.title}`);
          handlePropertyClick(); // Use handlePropertyClick to navigate
        }}
      />
    </View>
  );

  return (
    <View>
      <Text style={styles.subTitle}>Your Properties</Text>
      <FlatList
        data={addedPropertiesData}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true} // Makes the FlatList snap to the width of each item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20, // Reduced size
    fontFamily: fonts.primary.bold,
    marginBottom: 8, // Reduced margin
    textAlign: 'center',
  },
  subTitle: {
    fontSize: screenWidth * 0.045,  // Slightly smaller subtitle size
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 5,  // Reduced margin
  },
  propertyCard: {
    width: screenWidth * 0.60, // Reduced card width
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8, // Reduced padding inside the cards
    elevation: 3, // Shadow for better design
  },
  propertyInfo: {
    marginTop: 8, // Reduced margin
  },
  propertyStats: {
    fontFamily: fonts.primary.medium,
    fontSize: 12, // Reduced font size
    marginVertical: 1, // Reduced vertical spacing
  },
  analyticsButton: {
    marginTop: 8, // Reduced top margin
    backgroundColor: '#307e20',
    paddingVertical: 6, // Reduced padding
    borderRadius: 5,
    alignItems: 'center',
  },
  analyticsButtonText: {
    color: '#fff',
    fontFamily: fonts.primary.bold,
    fontSize: 12, // Reduced font size
  },
});

export default AddedProperties;
