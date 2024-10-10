import { Colors } from '@colors';
import { fonts } from '@fonts';
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

interface Props {
  message: string;
}

export const CustomFlashMessage = ({ message }: Props) => {
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 3000, // Match this duration to the one in showCustomFlashMessage
      useNativeDriver: false, // Use native driver for width animations
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Animated.View
        style={[
          styles.indicator,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 25, // Rounded corners for a modern look
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Add a subtle shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
  text: {
    color: Colors.light.background,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8, // Add some spacing between the text and the indicator
  },
  indicator: {
    height: 4,
    backgroundColor: '#FFF', // White color for the indicator for better visibility
    borderRadius: 2,
    width: '100%', // Initial width of the indicator
  },
});
