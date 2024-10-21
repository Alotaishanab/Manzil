import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Text } from 'react-native';
import { fonts } from '../../../../src/assets/fonts';
import { Colors } from '@colors';
import AuthorizedHeader from './AuthorizedHeader';
import { PropertyCard, TabButtons, TopSpace, SavedSearchModal } from '@components';
import { useIntl } from '@context';
import SavedCardSkeleton from '../../../components/molecules/CardSkeleton';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '@globalStyles';
import { useGetSavedProperties } from '@services';  // Import the query hook


const AuthorizedContent = () => {
  const { intl } = useIntl();
  const navigation: any = useNavigation();

  // Use the query hook to fetch saved properties
  const { data, isLoading, error } = useGetSavedProperties();

  const [btnSelected, setBtnSelected] = useState(
    intl.formatMessage({
      id: 'buttons.for-sale',
    }),
  );

  // Modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('');

  // Function to open the modal
  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSortSelection = (option: string) => {
    setSelectedSortOption(option);
  
    if (data && data.properties) {
      console.log("Properties data:", data.properties); // Log the entire properties data
  
      // Sort logic depending on the option selected
      if (option === 'Most Recent') {
        // Sort properties by most recent (based on listing_date)
        data.properties.sort((a: any, b: any) => {
          const dateA = a.listing_date ? new Date(a.listing_date) : new Date(0); // Handle undefined dates
          const dateB = b.listing_date ? new Date(b.listing_date) : new Date(0);
          return dateB - dateA;
        });
      } else if (option === 'Least Recent') {
        // Sort properties by least recent (based on listing_date)
        data.properties.sort((a: any, b: any) => {
          const dateA = a.listing_date ? new Date(a.listing_date) : new Date(0); // Handle undefined dates
          const dateB = b.listing_date ? new Date(b.listing_date) : new Date(0);
          return dateA - dateB;
        });
      } else if (option === 'Most Expensive') {
        data.properties.sort((a: any, b: any) => b.price - a.price);
      } else if (option === 'Least Expensive') {
        data.properties.sort((a: any, b: any) => a.price - b.price);
      }
    }
  
    toggleModalVisible(); // Close the modal
  };
  
  
  

  // Filter properties based on the selected tab (For Sale or To Rent)
  const filteredProperties = data?.properties.filter(property => 
    btnSelected === intl.formatMessage({ id: 'buttons.for-sale' })
      ? property.property_type === 'Sell'  // Assuming 'Sell' is for 'For Sale'
      : property.property_type === 'Rent'  // Assuming 'Rent' is for 'To Rent'
  );

  const handleCard = (property: any) => {
    // Navigate to PropertyScreen when a property is clicked
    navigation.navigate('PropertyScreen', { property });
  };

  const renderProperty = ({ item }: any) => {
    return (
      <PropertyCard
        sliderWidth={'90%'}
        marginBottom={8}
        item={item}
        handleClick={() => handleCard(item)}
      />
    );
  };

  if (isLoading) {
    // Render skeletons while loading
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <AuthorizedHeader />
        <View style={[styles.innerWrap, { paddingTop: 5, overflow: 'hidden' }]}>
          <SavedCardSkeleton />
          <SavedCardSkeleton />
          <SavedCardSkeleton />
        </View>
      </ScrollView>
    );
  }

  if (error) {
    // Render an error message if the query fails
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {intl.formatMessage({ id: 'errors.fetch-saved-properties' })} 
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <AuthorizedHeader />
        <View style={[styles.innerWrap, { paddingTop: 5, overflow: 'hidden' }]}>
          <TabButtons
            options={[
              intl.formatMessage({ id: 'buttons.for-sale' }),
              intl.formatMessage({ id: 'buttons.to-rent' }),
            ]}
            onSelect={(option) => setBtnSelected(option)}  // Update selected tab
            borderRadius={10}
            paddingVertical={10}
            selectedOption={btnSelected}
          />
          <TopSpace top={10} />

          {/* Custom search button to open modal */}
          <View style={[globalStyles.simpleRow, { alignSelf: 'flex-end' }]}>
            <TouchableOpacity onPress={toggleModalVisible} style={styles.searchButton}>
              <Text style={styles.searchText}>
                {selectedSortOption || intl.formatMessage({ id: 'savedPropertyScreen.search' })}
              </Text>
              <Text style={styles.dropdownIcon}> ▼ </Text>
            </TouchableOpacity>
          </View>

          <TopSpace top={10} />

          {/* Render filtered saved properties */}
          <FlatList
            data={filteredProperties}  // Use the filtered data
            contentContainerStyle={styles.flatListContentContainerStyle}
            ListFooterComponent={<View style={styles.footer} />}
            renderItem={renderProperty}
            keyExtractor={(item) => item.property_id.toString()}  // Ensure proper key for each item
          />
        </View>
      </ScrollView>

      {/* SavedSearchModal */}
      <SavedSearchModal
        isVisible={isModalVisible}
        toggleVisible={toggleModalVisible}
        onSelectOption={handleSortSelection}
      />
    </>
  );
};

export default AuthorizedContent;

const styles = StyleSheet.create({
  innerWrap: {
    margin: 7,
    padding: 10,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 16,
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.medium,
  },
  dropdownIcon: {
    fontSize: 16,
    color: Colors.light.primaryBtn,
    marginLeft: 5,
  },
  footer: {
    height: 10,
  },
  flatListContentContainerStyle: {
    width: '100%',
    paddingHorizontal: 3,
    overflow: 'hidden',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.light.error,
  },
});
