import React, { useState, useEffect, useCallback } from 'react';
import { AsyncHelper } from '../../../src/helpers/asyncHelper'; // Adjust the path
import { View, ScrollView, RefreshControl } from 'react-native';
import UnauthorizedContent from './components/UnauthorizedContent';
import AuthorizedContent from './components/AuthorizedContent';
import { styles } from './styles';
import { SavedSearchModal } from '@components';
import LottieView from 'lottie-react-native';
import { refreshAnimation } from '@assets'; // Assuming you've created this export in index.ts

export const SavedProperties = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>(''); // State to keep track of selected option
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State to control modal visibility

  // Function to toggle the modal visibility
  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible); // Toggle the modal visibility
  };

  // Function to handle the sort option selection from the modal
  const handleSortSelection = (option: string) => {
    setSelectedSortOption(option); // Update the selected sort option
    toggleModalVisible(); // Close the modal after selection
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncHelper.getToken();
      setIsLoggedin(!!token); // If token exists, set isLoggedin to true
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  // Handle pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(async () => {
      const token = await AsyncHelper.getToken();
      setIsLoggedin(!!token); // If token exists, set isLoggedin to true
      setRefreshing(false);
    }, 2000);
  }, []);

  // Show loading indicator while checking login status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={refreshAnimation}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="transparent"   // Hide default spinner on iOS
          colors={['transparent']}  // Hide default spinner on Android
        />
      }
    >
      {/* Custom refresh animation */}
      {refreshing && (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <LottieView
            source={refreshAnimation}
            autoPlay
            loop
            style={{ width: 50, height: 50 }} // Smaller size for the animation
          />
        </View>
      )}

      <View style={styles.container}>
        {isLoggedin ? (
          <AuthorizedContent
            toggleModalVisible={toggleModalVisible} // Pass the toggle modal function
            selectedSortOption={selectedSortOption} // Pass the selected sort option
          />
        ) : (
          <UnauthorizedContent />
        )}

        {/* Integrate SavedSearchModal and pass necessary props */}
        <SavedSearchModal
          isVisible={isModalVisible}
          toggleVisible={toggleModalVisible}
          onSelectOption={handleSortSelection} // Handle the option selection
        />
      </View>
    </ScrollView>
  );
};
