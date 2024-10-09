import React, { useState, useEffect } from 'react';
import { AsyncHelper } from '../../../src/helpers/asyncHelper'; // Adjust the path
import { View, ActivityIndicator } from 'react-native';
import UnauthorizedContent from './components/UnauthorizedContent';
import AuthorizedContent from './components/AuthorizedContent';
import { styles } from './styles';
import { SavedSearchModal } from '@components';

export const SavedProperties = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  // Show loading indicator while checking login status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
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
  );
};
