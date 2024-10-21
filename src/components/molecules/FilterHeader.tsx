import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { ExploreIcon, FilterIcon } from '@svgs';
import { Colors } from '@colors';
import { fonts } from '../../../src/assets/fonts';
import { globalStyles } from '../../../src/styles/globalStyles';
import { useIntl } from '@context';
import FilterModal from '../../helpers/FilterModal'; // Adjust the import path

const FilterHeader = ({ handleFilter, onFocusInput }: any) => {
  const { intl } = useIntl();
  const [isFilterVisible, setFilterVisible] = useState(false);

  // Function to toggle the filter modal
  const toggleFilterModal = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <View>
      <View style={[globalStyles.simpleRow]}>
        <View style={[styles.exploreWrap]}>
          <ExploreIcon width={30} height={30} />
          <TextInput
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
          onPress={toggleFilterModal} // Show modal when button is pressed
          style={styles.filterBtn}>
          <FilterIcon width={25} height={25} />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <FilterModal isVisible={isFilterVisible} onClose={toggleFilterModal} />
    </View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  exploreWrap: {
    borderRadius: 25,
    paddingHorizontal: 20,
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBg,
  },
  exploreText: {
    marginHorizontal: 20,
    fontSize: 12,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  filterBtn: {
    borderWidth: 1.5,
    borderRadius: 17,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
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
