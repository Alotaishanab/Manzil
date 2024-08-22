/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {globalStyles} from '@globalStyles';
import {CheckedWindow} from '@svgs';
import {fonts} from '@fonts';
import {Colors} from '@colors';

const RowTitleValue = ({title, value, handleClick = () => {}}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleClick}
      style={[globalStyles.rowSpaceBetween, {marginBottom: 20}]}>
      <View style={globalStyles.simpleRow}>
        <CheckedWindow width={30} height={30} />
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      <Text style={[styles.value, {top: 5}]}>{value}</Text>
    </TouchableOpacity>
  );
};

export default RowTitleValue;

const styles = StyleSheet.create({
  headingTitle: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: Colors.light.headingTitle,
  },
  rowTitle: {
    marginLeft: 10,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  value: {
    color: Colors.light.grey,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
});
