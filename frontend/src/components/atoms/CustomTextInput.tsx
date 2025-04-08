import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import { Colors } from '@colors';
import { fonts } from '@fonts';

interface Props extends TextInputProps {
  label: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  showToggleEye?: boolean;
  handleToggleEye?: () => void;
}

export const CustomTextInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  labelStyle,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelAnimatedStyle = {
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 6],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#BDBDBD', '#00C853'],
    }),
  };

  const borderAnimatedStyle = {
    borderColor: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#D0D0D0', '#00C853'],
    }),
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Animated.View style={[styles.inputContainer, borderAnimatedStyle]}>
        <Animated.Text style={[styles.label, labelAnimatedStyle, labelStyle]}>
          {label}
        </Animated.Text>
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, inputStyle]}
          placeholderTextColor="#BDBDBD"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 18,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 18,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontFamily: fonts.primary.medium,
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: Colors.light.headingTitleDark,
    paddingTop: 2,
  },
});
