import React from 'react';
import { GenericModal } from './GenericModal';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useIntl } from '@context';
import { TopSpace } from '../atoms';
import { fonts } from '@fonts';
import { Colors } from '@colors';

export const SavedSearchModal = ({ isVisible, toggleVisible, onSelectOption }: any) => {
  const { intl } = useIntl();

  // Sorting options
  const searchOptions: any = [
    {
      label: intl.formatMessage({
        id: 'savedSearch.newestDateSaved',
      }),
      value: 'Most Recent',
    },
    {
      label: intl.formatMessage({
        id: 'savedSearch.oldestDateSaved',
      }),
      value: 'Least Recent',
    },
    {
      label: intl.formatMessage({
        id: 'savedSearch.mostExpensive',
      }),
      value: 'Most Expensive',
    },
    {
      label: intl.formatMessage({
        id: 'savedSearch.mostCheap',
      }),
      value: 'Least Expensive',
    },
  ];

  const handleSelection = (value: string) => {
    onSelectOption(value); // Call the parent function to handle selection
    toggleVisible(); // Close modal after selection
  };

  return (
    <GenericModal
      centeredModal={false}
      isVisible={isVisible}
      showCloseButton={false}
      centerText={true}
      modalTitle={intl.formatMessage({ id: 'savedSearchModal.title' })}
      toggleModal={toggleVisible}
    >

      {/* Render sorting options as buttons */}
      <View style={styles.optionsContainer}>
        {searchOptions.map((option: any) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleSelection(option.value)}
            style={styles.optionButton}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TopSpace top={10} />
    </GenericModal>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.primaryBtn,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#fff',
  },
});

export default SavedSearchModal;
