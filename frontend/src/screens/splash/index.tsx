import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { launchScreen } from '@assets';
import { useNavigation } from '@react-navigation/native';
import AsyncHelper from '../../helpers/asyncHelper';

export const SplashScreen = () => {
  const navigation = useNavigation();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const determineFirstTimeStatus = async () => {
      // Still check first time to preserve any potential future logic
      const firstTime = await AsyncHelper.isFirstTime();
      setIsFirstTime(firstTime);
    };

    // Run animation and check first-time status in parallel
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
      determineFirstTimeStatus(); // Check first-time status after animation
    });
  }, []);

  useEffect(() => {
    if (isFirstTime !== null) {
      // Delay for a smooth splash experience, then force navigation to Login
      const timer = setTimeout(() => {
        navigation.replace('Auth', { screen: 'BottomTabNavigator' });
      }, 1500);
      return () => clearTimeout(timer);
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
    backgroundColor: 'green',
  },
  logo: {
    width: 500,
    height: 500,
  },
});
