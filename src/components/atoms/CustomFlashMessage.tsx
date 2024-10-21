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
      duration: 3000, // Match the duration to the one in showCustomFlashMessage
      useNativeDriver: false, 
    }).start();
  }, [progress]);

  const [greeting, status] = message.split('\n');

  return (
    <View style={styles.container}>
      {/* Larger font for the greeting */}
      <Text style={styles.greetingText}>{greeting}</Text>

      {/* Smaller and less prominent font for the status message */}
      <Text style={styles.statusText}>{status}</Text>

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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25, 
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
  },
  greetingText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.bold,
    fontSize: 18, // Make the greeting text larger
    textAlign: 'center',
    marginBottom: 5, 
  },
  statusText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.regular,
    fontSize: 14, // Smaller font for status message
    textAlign: 'center',
    marginBottom: 10,
  },
  indicator: {
    height: 4,
    backgroundColor: '#FFF',
    borderRadius: 2,
    width: '100%',
  },
});
