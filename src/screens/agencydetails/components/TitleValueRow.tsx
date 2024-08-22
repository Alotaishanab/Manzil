/* eslint-disable react-native/no-inline-styles */
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type TitleValueRowType = {
  title: string;
  value: string | number;
};

const TitleValueRow: React.FC<TitleValueRowType> = ({title, value}) => {
  return (
    <View style={[globalStyles.rowSpaceBetween, {paddingVertical: 7}]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default TitleValueRow;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: Colors.light.greyHeading,
    fontFamily: fonts.primary.medium,
  },
  value: {
    fontSize: 13,
    color: Colors.light.subTitle,
    fontFamily: fonts.primary.regular,
  },
});
