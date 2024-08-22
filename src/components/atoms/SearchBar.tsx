import React from 'react';
import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {ExploreIcon, FilterIcon} from '@svgs';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';
import {globalStyles} from '../../../src/styles/globalStyles';

type SearchType = {
  placeholder: string;
  showFilterBtn: boolean;
  onFocusInput?: () => void;
  handleFilter?: () => void;
};

export const SearchBar: React.FC<SearchType> = ({
  placeholder,
  showFilterBtn,
  onFocusInput = () => {},
  handleFilter = () => {},
}) => {
  return (
    <View style={globalStyles.simpleRow}>
      <View style={styles.exploreWrap}>
        <ExploreIcon width={30} height={30} />
        <TextInput
          onFocus={onFocusInput}
          placeholderTextColor={Colors.light.headingTitle}
          placeholder={placeholder}
          style={styles.inputStyle}
        />
      </View>
      {showFilterBtn && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleFilter}
          style={styles.filterBtn}>
          <FilterIcon width={25} height={25} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  exploreWrap: {
    borderRadius: 25,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 12,
    height: 50,
    backgroundColor: Colors.light.inputBg,
  },
  exploreText: {
    marginHorizontal: 20,
    fontSize: 12,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  inputStyle: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 10,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  filterBtn: {
    borderWidth: 1.5,
    borderRadius: 17,
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
  },
});
