import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Text } from 'react-native';
import { fonts } from '../../../../src/assets/fonts';
import { Colors } from '@colors';
import AuthorizedHeader from './AuthorizedHeader';
import { PropertyCard, TabButtons, TopSpace, SavedSearchModal } from '@components';
import { useIntl } from '@context';
import SavedCardSkeleton from '../../../components/molecules/CardSkeleton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect
import { globalStyles } from '@globalStyles';
import { useGetSavedProperties } from '@services';

const AuthorizedContent = () => {
  const { intl } = useIntl();
  const navigation: any = useNavigation();

  // Use the query hook to fetch saved properties
  const { data, isLoading, error, refetch } = useGetSavedProperties();  // Make sure refetch is returned

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

  // Use `useFocusEffect` to refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();  // Trigger a refetch when the screen gains focus
    }, [refetch])
  );

  const handleSortSelection = (option: string) => {
    setSelectedSortOption(option);
    if (data && data.properties) {
      console.log("Properties data:", data.properties);
      if (option === 'Most Recent') {
        data.properties.sort((a: any, b: any) => new Date(b.listing_date) - new Date(a.listing_date));
      } else if (option === 'Least Recent') {
        data.properties.sort((a: any, b: any) => new Date(a.listing_date) - new Date(b.listing_date));
      } else if (option === 'Most Expensive') {
        data.properties.sort((a: any, b: any) => b.price - a.price);
      } else if (option === 'Least Expensive') {
        data.properties.sort((a: any, b: any) => a.price - b.price);
      }
    }
    toggleModalVisible();
  };

  // Filter properties based on the selected tab (For Sale or To Rent)
  const filteredProperties = data?.properties.filter(property => 
    btnSelected === intl.formatMessage({ id: 'buttons.for-sale' })
      ? property.property_type === 'Sell'
      : property.property_type === 'Rent'
  );

  const handleCard = (property: any) => {
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
            onSelect={(option) => setBtnSelected(option)}
            borderRadius={10}
            paddingVertical={10}
            selectedOption={btnSelected}
          />
          <TopSpace top={10} />

          <View style={[globalStyles.simpleRow, { alignSelf: 'flex-end' }]}>
            <TouchableOpacity onPress={toggleModalVisible} style={styles.searchButton}>
              <Text style={styles.searchText}>
                {selectedSortOption || intl.formatMessage({ id: 'savedPropertyScreen.search' })}
              </Text>
              <Text style={styles.dropdownIcon}> ▼ </Text>
            </TouchableOpacity>
          </View>

          <TopSpace top={10} />

          <FlatList
            data={filteredProperties}
            contentContainerStyle={styles.flatListContentContainerStyle}
            ListFooterComponent={<View style={styles.footer} />}
            renderItem={renderProperty}
            keyExtractor={(item) => item.property_id.toString()}
          />
        </View>
      </ScrollView>

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
