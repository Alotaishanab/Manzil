/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';

type TitleValueType = {
  title?: string;
  value: string | number;
};

const TitleValueRow: React.FC<TitleValueType> = ({title, value}) => {
  return (
    <View style={[globalStyles.rowSpaceBetween, {marginBottom: 20}]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.val}>{value}</Text>
    </View>
  );
};
export default TitleValueRow;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: Colors.light.headingTitle,
  },
  title: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 13,
  },
  val: {
    color: Colors.light.greyHeading,
    fontFamily: fonts.primary.medium,
    fontSize: 13,
  },
});
