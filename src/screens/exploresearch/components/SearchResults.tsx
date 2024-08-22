import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ClockIcon} from '@svgs';
import {styles} from '../styles';
import {globalStyles} from '../../../../src/styles/globalStyles';

const SearchResults = ({handleClick = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={[globalStyles.simpleRow, {paddingVertical: 6}]}>
      <ClockIcon width={20} height={20} />
      <Text>{'  '}</Text>
      <Text style={styles.headingTitleStyle}>
        Riyadh,SA single-family houses
      </Text>
    </TouchableOpacity>
  );
};

export default SearchResults;
