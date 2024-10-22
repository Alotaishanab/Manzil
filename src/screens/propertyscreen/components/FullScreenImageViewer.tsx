import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface FullScreenImageViewerProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

export const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleGesture = (event) => {
    translateY.value = event.nativeEvent.translationY;
  };

  const handleGestureEnd = (event) => {
    if (Math.abs(event.nativeEvent.translationY) > 200) {
      onClose();
    } else {
      translateY.value = withSpring(0);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onEnded={handleGestureEnd}
      >
        <Animated.View style={[styles.fullScreenContainer, animatedStyle]}>
          <ImageViewing
            images={images.map((uri) => ({ uri }))}
            imageIndex={initialIndex}
            visible={true}
            onRequestClose={onClose}
            swipeToCloseEnabled={true}
            doubleTapToZoomEnabled={true}
          />
        </Animated.View>
      </PanGestureHandler>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fullScreenContainer: {
    width: '100%',
    height: screenHeight,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FullScreenImageViewer;
