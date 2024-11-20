// src/components/molecules/FilterHeader.tsx

import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ExploreIcon, FilterIcon } from '@svgs'; // Ensure these are correctly imported
import { Colors } from '@colors'; // Adjust the path as necessary
import { fonts } from '../../../src/assets/fonts'; // Adjust the path as necessary
import { globalStyles } from '../../../src/styles/globalStyles'; // Adjust the path as necessary
import { useIntl } from '@context'; // Ensure useIntl is correctly implemented
import FilterModal from '../../helpers/FilterModal'; // Adjust the import path as necessary

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
    const { intl } = useIntl();

    return (
      <View>
        <View style={globalStyles.simpleRow}>
          <View style={styles.exploreWrap}>
            <ExploreIcon width={30} height={30} />
            <TextInput
              ref={textInputRef}
              numberOfLines={2}
              multiline
              style={styles.inputStyle}
              onFocus={onFocusInput}
              placeholderTextColor={Colors.light.headingTitle}
              placeholder={intl.formatMessage({
                id: 'explore.search-placeholder',
              })}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleFilterModal} // Toggle FilterModal when pressed
            style={styles.filterBtn}
            accessibilityLabel="Open filter options"
          >
            <FilterIcon width={25} height={25} />
          </TouchableOpacity>
        </View>

        {/* Filter Modal */}
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
  exploreWrap: {
    borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 20,
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.filterLine,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
  },
  filterBtn: {
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for frosted glass effect
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
    zIndex: 1001, // Ensure it stays above other components
  },
  inputStyle: {
    flex: 1,
    height: '100%',
    fontSize: 11,
    lineHeight: 20,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
});

export default FilterHeader;
