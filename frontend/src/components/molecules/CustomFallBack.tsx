import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';
import {width} from '../../hooks/useDimension';

export const CustomFallback = (props: {error: Error; resetError: Function}) => {
  return (
    <View style={styles.mainWrapper}>
      <Text style={styles.titleColor}>Something went wrong</Text>
      <Text style={styles.descriptionStyle}>{props.error.toString()}</Text>
      <Pressable style={styles.btnStyle} onPress={() => props.resetError()}>
        <Text style={styles.btnText}>Try again</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  titleColor: {
    fontSize: 20,
    marginVertical: 10,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
  },
  descriptionStyle: {
    fontSize: 14,
    marginVertical: 10,
    lineHeight: 28,
    textAlign: 'center',
    width: '80%',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  btnStyle: {
    borderRadius: 30,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: "center",
    marginBottom: 10,
    width: width - 100,
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 15,
  },
  btnText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.background,
  },
});
