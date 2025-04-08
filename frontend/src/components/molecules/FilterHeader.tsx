// src/components/molecules/FilterHeader.tsx

import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ExploreIcon, FilterIcon } from '@svgs';
import FilterModal from '../../helpers/FilterModal';

interface FilterHeaderProps {
  isFilterVisible: boolean;
  toggleFilterModal: () => void;
  onApplyFilters?: () => void;
  textInputRef?: React.RefObject<TextInput>;
  onFocusInput?: () => void;
}

const FilterHeader = forwardRef<TextInput, FilterHeaderProps>(
  ({
    isFilterVisible,
    toggleFilterModal,
    onApplyFilters,
    textInputRef,
    onFocusInput,
  }) => {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.exploreWrap}>
            <ExploreIcon width={30} height={30} fill="#FFFFFF" />
            <TextInput
              ref={textInputRef}
              numberOfLines={2}
              multiline
              style={styles.inputStyle}
              onFocus={onFocusInput}
              placeholderTextColor="#FFFFFF"
              placeholder="Find what you're looking for..."
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleFilterModal}
            style={styles.filterBtn}
            accessibilityLabel="Open filter options"
          >
            <FilterIcon width={25} height={25} fill="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FilterModal
          isVisible={isFilterVisible}
          onClose={toggleFilterModal}
          onApplyFilters={onApplyFilters}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the search bar and filter button horizontally
  },
  exploreWrap: {
    borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 20,
    flex: 1, // Set flex of the search bar container to 0.9
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: '#4CAF50', // Green border color
  },
  filterBtn: {
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4CAF50', // Green border color
  },
  inputStyle: {
    flex: 1,
    height: '100%',
    fontSize: 14, // Bigger font size for the text & placeholder
    lineHeight: 20,
    color: '#FFFFFF',
    textAlignVertical: 'center', // For Android vertical centering
    paddingTop: 6, // Adjust this value for iOS vertical alignment if needed
  },
});

export default FilterHeader;
