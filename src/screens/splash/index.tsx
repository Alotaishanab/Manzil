import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { launchScreen } from '@assets'; // Ensure this points to your splash screen image asset
import { useNavigation } from '@react-navigation/native';
import AsyncHelper from '../../helpers/asyncHelper'; // Importing AsyncHelper

export const SplashScreen = () => {
  const navigation = useNavigation();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  const determineFirstTimeStatus = async () => {
    const firstTime = await AsyncHelper.isFirstTime();
    setIsFirstTime(firstTime);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      determineFirstTimeStatus(); // Ensure the check happens after animation starts
    });
  }, []);

  useEffect(() => {
    if (isFirstTime !== null) {
      // Provide enough time for the splash screen to be visible
      const timer = setTimeout(() => {
        if (isFirstTime) {
          navigation.replace('Auth'); // Navigate to onboarding/login flow
        } else {
          navigation.replace('MainApp'); // Navigate directly to Explore screen
        }
      }, 1500); // Adjust delay for smoother transitions
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [isFirstTime, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={launchScreen}
        style={[
          styles.logo,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 500,
    height: 500,
  },
});
