/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';

export const RowTitleValue = ({title, value, handleClick = () => {}}: any) => {
  return (
    <Pressable
      onPress={handleClick}
      style={[globalStyles.rowSpaceBetween, {paddingVertical: 7}]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.val}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 14,
  },
  val: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
});
