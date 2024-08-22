import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '@colors';
import * as SVGs from '../../assets/svgs';
import {fonts} from '../../../src/assets/fonts';
import {globalStyles} from '../../../src/styles/globalStyles';
import {ChevronForwardIcon} from '@svgs';

const IconTitleButtonArrow = ({
  iconName = 'LockIcon',
  title,
  rightIcon = 'ChevronForwardIcon',
  handleClick = () => {},
}: any) => {
  const Icon = SVGs[iconName];
  const RightIcon = SVGs[rightIcon];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleClick}
      style={styles.mainWrapper}>
      <View style={globalStyles.simpleRow}>
        <Icon width={25} height={25} />
        <Text style={styles.textStyle}>{title}</Text>
      </View>

      <RightIcon width={20} height={20} />
    </TouchableOpacity>
  );
};

export default IconTitleButtonArrow;

const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  textStyle: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: fonts.primary.medium,
  },
});
