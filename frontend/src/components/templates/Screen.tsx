import React from 'react';
import {SafeAreaView, View} from 'react-native';
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
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      {showKeyboardAware ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
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
