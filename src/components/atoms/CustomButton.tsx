/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Pressable, Text, StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts/index';
import * as SVGs from '../../assets/svgs';

type ButtonProps = {
  title?: string;
  handleClick: any;
  textSize?: number;
  textColor?: string;
  showRightIconButton?: boolean;
  disabled: boolean;
  showSocialButton?: boolean;
  type?: 'primary' | 'secondary';
  iconName?: string;
  marginLeft?: number;
  btnBg?: string;
  btnWidth?: any;
  borderColor?: any;
  textButtonWithIcon?: any;
  iconWidth?: any;
  leftIconColor?: any;
  iconHeight?: any;
  style?: any;
  borderRadius?: number;
  fontFamily?: any;
};

export const CustomButton = ({
  title,
  handleClick = () => {},
  textSize = 16,
  textColor = Colors.light.background,
  showRightIconButton,
  iconWidth = 30,
  iconHeight = 30,
  disabled = false,
  type = 'primary',
  showSocialButton = false,
  iconName = 'Google',
  marginLeft = 0,
  btnBg = Colors.light.primaryBtn,
  btnWidth = '90%',
  borderColor,
  textButtonWithIcon = false,
  borderRadius = 5,
  leftIconColor = Colors.light.headingTitle,
  fontFamily = fonts.primary.medium,
}: ButtonProps) => {
  const Icon = SVGs[iconName];
  const LeftIcon = SVGs[iconName];

  return (
    <>
      {!showSocialButton && !textButtonWithIcon && (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={disabled}
          onPress={handleClick}
          style={[
            styles.buttonWrapper,
            {
              borderRadius: borderRadius,
              borderColor: borderColor ? borderColor : btnBg,
              width: btnWidth,
              backgroundColor: disabled ? Colors.light.disabled : btnBg,
            },
          ]}>
          <Text
            style={[
              styles.textStyle,
              {
                fontFamily: fontFamily,
                color: textColor,
                fontSize: textSize,
              },
            ]}>
            {title}
          </Text>
          {showRightIconButton && (
            <Pressable style={styles.rightIconButton}>
              <SVGs.ForwardArrowIcon width={25} height={25} />
            </Pressable>
          )}
        </TouchableOpacity>
      )}

      {!showSocialButton && textButtonWithIcon && (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={disabled}
          onPress={handleClick}
          style={[
            styles.buttonWrapper,
            {
              borderRadius: borderRadius,
              flexDirection: 'row',
              borderColor: borderColor ? borderColor : btnBg,
              width: btnWidth,
              backgroundColor: disabled ? Colors.light.disabled : btnBg,
            },
          ]}>
          <LeftIcon
            fill={leftIconColor}
            width={iconWidth || 30}
            height={iconHeight || 30}
          />
          <Text
            style={[
              styles.simpleTextStyle,
              {
                fontFamily: fontFamily,
                color: textColor,
                fontSize: textSize,
              },
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
      )}

      {showSocialButton && !textButtonWithIcon && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleClick}
          style={[
            styles.socialBtn,
            {
              borderRadius: borderRadius,
              marginLeft: marginLeft,
            },
          ]}>
          <Icon />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colors.light.primaryBtn,
    borderRadius: 5,
    paddingVertical: 13,
    borderWidth: 1,
    height: 52,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.light.background,
    fontFamily: fonts.primary.medium,
  },
  simpleTextStyle: {
    textAlign: 'center',
    marginLeft: 10,
    color: Colors.light.background,
    fontFamily: fonts.primary.medium,
  },
  rightIconButton: {
    height: 35,
    width: 35,
    position: 'absolute',
    right: 15,
    borderRadius: 12,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialBtn: {
    backgroundColor: Colors.light.inputBg,
    flex: 1,
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
