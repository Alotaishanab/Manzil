import React, { useState } from 'react';
import { Screen, SavedSearchModal } from '@components';
import { View } from 'react-native';
import { Colors } from '@colors';
import UnauthorizedContent from './components/UnauthorizedContent';
import AuthorizedContent from './components/AuthorizedContent';
import { useIntl } from '@context';

export const SavedProperties = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State to control modal visibility
  const [selectedSortOption, setSelectedSortOption] = useState<string>(''); // State to keep track of selected option
  const { intl } = useIntl();

  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible); // Toggle the modal visibility
  };

  const handleSortSelection = (option: string) => {
    setSelectedSortOption(option); // Update the selected sort option
    toggleModalVisible(); // Close the modal after selection
  };

  return (
    <Screen padding={0} showKeyboardAware={!isLoggedin ? true : false}>
      <View style={{ backgroundColor: Colors.light.secondaryBackground }}>
        {!isLoggedin && <UnauthorizedContent setIsLoggedin={setIsLoggedin} />}
        {isLoggedin && (
          <AuthorizedContent
            toggleModalVisible={toggleModalVisible} // Pass the modal toggle function
            selectedSortOption={selectedSortOption} // Pass selected option to display
          />
        )}

        {/* Modal for sorting options */}
        <SavedSearchModal
          isVisible={isModalVisible}
          toggleVisible={toggleModalVisible}
          onSelectOption={handleSortSelection} // Handle the option selection
        />
      </View>
    </Screen>
  );
};
