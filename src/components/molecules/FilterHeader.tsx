import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {ExploreIcon, FilterIcon} from '@svgs';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';
import {globalStyles} from '../../../src/styles/globalStyles';
import {useIntl} from '@context';

const FilterHeader = ({handleFilter, onFocusInput}: any) => {
  const {intl} = useIntl();
  return (
    <View style={globalStyles.simpleRow}>
      <View style={styles.exploreWrap}>
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
        onPress={handleFilter}
        style={styles.filterBtn}>
        <FilterIcon width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  exploreWrap: {
    borderRadius: 25,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 12,
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
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 4,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
});
