/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {globalStyles} from '@globalStyles';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {RadioButton} from 'react-native-paper';

export const CustomCheckbox = ({title, selectedOption, onValueChange}: any) => {
  console.log('selectedOption:', selectedOption);
  console.log('title:', title);
  return (
    <View
      style={[
        globalStyles.simpleRow,
        styles.mainWrap,
        {
          backgroundColor:
            title === selectedOption ? Colors.light.checkboxBtnBg : undefined,
        },
      ]}>
      <Text
        style={[
          styles.checkboxTitle,
          {
            marginRight: 45,
          },
        ]}>
        {title}
      </Text>
      <RadioButton.Android
        uncheckedColor={Colors.light.headingTitle}
        color={Colors.light.headingTitle}
        value={selectedOption}
        status={selectedOption === title ? 'checked' : 'unchecked'}
        onPress={() => onValueChange(title)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.light.checkboxBtnBg,
    paddingHorizontal: 35,
    paddingVertical: 7,
    borderRadius: 10,
  },
  checkboxTitle: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    marginRight: 10,
  },
});
