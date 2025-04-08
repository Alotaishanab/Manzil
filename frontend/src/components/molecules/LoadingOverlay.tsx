import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { loadingAnimation } from '@assets';

export const LoadingOverlay: React.FC = () => (
  <View style={styles.loadingOverlay}>
    <View style={styles.loadingContainer}>
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop
        style={styles.loadingAnimation}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent white background
    borderRadius: 10,
  },
  loadingAnimation: {
    width: 50,
    height: 50,
  },
});

export default LoadingOverlay;
