/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Colors} from '@colors';
import {fonts} from '../../../assets/fonts';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as SVGs from '../../../assets/svgs';

type ButtonType = {
  iconWidth: any;
  iconHeight: any;
  iconName: any;
  title: any;
  backgroundColor?: any;
  color?: any;
};

export const SmallButton: React.FC<ButtonType> = ({
  iconWidth,
  iconHeight,
  iconName,
  title,
  backgroundColor = Colors.light.background,
  color = Colors.light.headingTitle,
}) => {
  const Icon: any = SVGs[iconName];
  return (
    <TouchableOpacity
      style={[
        styles.btnStyle,
        {
          flex: 1,
          backgroundColor: backgroundColor,
        },
      ]}>
      <Icon width={iconWidth || 18} height={iconHeight || 18} />
      <Text
        style={[
          styles.btnText,
          {
            color: color,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    // paddingHorizontal: 20,
    marginLeft: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    marginLeft: 10,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
  },
});
