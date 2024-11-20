// src/screens/SavedProperties.tsx

import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useQueryClient } from '@tanstack/react-query';
import { AsyncHelper } from '../../../src/helpers/asyncHelper';
import AuthorizedContent from './components/AuthorizedContent';
import { styles as componentStyles } from './styles';
import { SavedSearchModal, CardSkeleton } from '@components'; // Import CardSkeleton
import { refreshAnimation } from '@assets';
import { Colors } from '@colors';
import { useGetSavedProperties } from '@services'; // Adjust the import path

export const SavedProperties = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSortSelection = (option: string) => {
    setSelectedSortOption(option);
    toggleModalVisible();
  };

  // Use React Query to fetch saved properties
  const {
    data: savedPropertiesData,
    isLoading: propertiesLoading,
    isError,
    refetch: refetchSavedProperties,
  } = useGetSavedProperties({
    enabled: true, // Always fetch since user is logged in
    retry: 1, // Retry once on failure
    onError: (error) => {
      console.error('Error fetching saved properties:', error);
      Alert.alert('Error', 'Failed to fetch saved properties.');
    },
  });

  // Handle pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await queryClient.invalidateQueries(['savedProperties']);
      await refetchSavedProperties();
    } catch (error) {
      console.error('Error during refresh:', error);
      Alert.alert('Error', 'Failed to refresh saved properties.');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[{ flexGrow: 1 }, componentStyles.container]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="transparent" // Hide default spinner on iOS
          colors={['transparent']} // Hide default spinner on Android
        />
      }
      style={{ backgroundColor: Colors.light.background }}
    >
      {/* Custom refresh animation */}
      {refreshing && (
        <View style={componentStyles.refreshContainer}>
          <LottieView
            source={refreshAnimation}
            autoPlay
            loop
            style={componentStyles.refreshAnimation}
          />
        </View>
      )}

      <View style={componentStyles.container}>
        {propertiesLoading ? (
          // Render multiple CardSkeletons
          Array(5).fill(null).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : isError ? (
          <View style={componentStyles.errorContainer}>
            <Text style={componentStyles.errorText}>
              {intl.formatMessage({ id: 'errors.fetch-saved-properties' })} 
            </Text>
          </View>
        ) : (
          <AuthorizedContent
            toggleModalVisible={toggleModalVisible}
            selectedSortOption={selectedSortOption}
            savedProperties={savedPropertiesData?.properties || []}
            propertiesLoading={propertiesLoading}
            isError={isError}
          />
        )}

        {/* Integrate SavedSearchModal and pass necessary props */}
        <SavedSearchModal
          isVisible={isModalVisible}
          toggleVisible={toggleModalVisible}
          onSelectOption={handleSortSelection}
        />
      </View>
    </ScrollView>
  );
};

export default SavedProperties;

const styles = StyleSheet.create({
  // Add any additional styles if necessary
});
