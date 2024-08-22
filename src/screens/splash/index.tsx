import React, {useEffect, useState, useRef} from 'react';
import {launchScreen} from '@assets';
import {useNavigation} from '@react-navigation/native';
import {View, Animated, StyleSheet} from 'react-native';

export const SplashScreen = () => {
  const navigation: any = useNavigation();
  const [animationDone, setAnimationDone] = useState(false);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000, // Shortened duration to 500ms
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4, // Increased friction for a quicker, more 'bouncy' effect
        tension: 150, // Added tension for extra 'springiness'
        useNativeDriver: true,
      }),
    ]).start(() => setAnimationDone(true)); // Set the animationDone state to true when animation finishes
  }, []);

  if (animationDone) {
    navigation.navigate('Onboarding');
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={launchScreen}
        style={[
          styles.logo,
          {opacity: logoOpacity, transform: [{scale: logoScale}]},
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
