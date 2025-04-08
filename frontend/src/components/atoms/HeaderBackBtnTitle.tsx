import {Colors} from '@colors';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {fonts} from '../../assets/fonts/index';
import {BackChevronIcon, BackIcon} from '@svgs';
import {useNavigation} from '@react-navigation/native';

type Prop = {
  text: string;
  fontFamily?: any;
  textColor?: any;
  backgroundColor?: any;
};

export const HeaderBackButtonTitle = ({
  text,
  fontFamily = fonts.tertiary.bold,
  textColor = Colors.light.headingTitle,
  backgroundColor = Colors.light.background,
}: Prop) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.mainWrap,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <BackChevronIcon
          // color={Colors.light.secondaryBackground}
          width={25}
          height={25}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.textStyle,
          {
            fontFamily: fontFamily,
            color: textColor,
          },
        ]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    zIndex: 200,
    top: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    left: 0,
    right: 0,
  },
  textStyle: {
    fontSize: 28,
    flex: 1,
    textAlign: 'center',
    color: Colors.light.headingTitle,
    fontFamily: fonts.tertiary.semiBold,

    // fontWeight: '500',
  },
});
