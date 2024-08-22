import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from '../../../src/screens/login/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '@colors';
interface ScreenProps {
  children: ReactNode;
  showKeyboardAware?: boolean;
  paddingHorizontal?: any;
  padding?: any;
  backgroundColor?: any;
}

export const Screen = ({
  showKeyboardAware = false,
  paddingHorizontal,
  padding = 20,
  backgroundColor = Colors.light.background,
  children,
}: ScreenProps) => {
  return (
    <SafeAreaView
      style={[
        styles.screenWrap,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      {showKeyboardAware ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.innerWrap,
            {
              padding: padding,
              backgroundColor: backgroundColor,
            },
          ]}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          // showsVerticalScrollIndicator={false}
          style={[
            styles.innerWrap,
            {
              backgroundColor: backgroundColor,
              padding: padding,
              paddingHorizontal: paddingHorizontal || undefined,
            },
          ]}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Screen;
