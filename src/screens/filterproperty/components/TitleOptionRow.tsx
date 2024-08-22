import React from 'react';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';
import {globalStyles} from '../../../../src/styles/globalStyles';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import * as SVGs from '../../../assets/svgs';

const TitleOptionRow = ({title, option}) => {
  return (
    <TouchableOpacity style={styles.btnWrapper}>
      <Text style={styles.btnTitleText}>{title}</Text>
      <Text style={styles.btnOptionText}>{option}</Text>
    </TouchableOpacity>
  );
};

export default TitleOptionRow;

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.light.greyDescription,
  },
  btnTitleText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 13,
  },
  btnOptionText: {
    color: Colors.light.greyDescription,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
});
