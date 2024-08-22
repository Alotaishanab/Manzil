import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SearchOutlineIcon} from '@svgs';
import {globalStyles} from '../../../../src/styles/globalStyles';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';

const SuggestedSearches = ({handleClick = () => {}}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleClick}
      style={[globalStyles.simpleRow, {paddingVertical: 6}]}>
      <SearchOutlineIcon width={20} height={20} />
      <Text>{'  '}</Text>
      <Text style={styles.title}>Homes in Los Angeles CA</Text>
    </TouchableOpacity>
  );
};

export default SuggestedSearches;

const styles = StyleSheet.create({
  title: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
});
