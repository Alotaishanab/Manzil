import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../assets/fonts/index';
import { PropertyCardSimple } from '../../components/molecules/PropertyCardSimple';
import { PropertyScreen } from '@screens';

const { width: screenWidth } = Dimensions.get('window');

// Sample data for similar properties
export const similarPropertiesData = [
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
];



export const SimilarProperties= () => {
  const navigation = useNavigation(); // Initialize navigation

  const handlePropertyClick = () => {
    console.log('Property card clicked. Navigating to PropertyScreen.'); // Log for debugging
    navigation.navigate('PropertyScreen'); // Navigate to PropertyScreen when a card is clicked
  };

  return (
    <FlatList
      data={similarPropertiesData}
      renderItem={({ item }) => (
        <PropertyCardSimple
          item={item}
          handleClick={() => {
            console.log(`Clicked on property: ${item.title}`); // Log the item clicked
            handlePropertyClick(); // Use handlePropertyClick to navigate
          }}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContent}
      showsHorizontalScrollIndicator={false}
      horizontal={true} // Ensure horizontal display
      pagingEnabled={true} // This will make the FlatList snap to the width of each item
      ItemSeparatorComponent={() => <View style={{ width: 15 }} />} // Add spacing between items
    />
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    alignItems: 'center', // Center align items vertically if needed
  },
});

export default SimilarProperties;
