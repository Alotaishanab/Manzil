import {Colors} from '@colors';
import {fonts} from '@fonts';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const CustomFlashMessage = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 20, // Make the view rounded
    marginHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: Colors.light.background,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
  },
});
