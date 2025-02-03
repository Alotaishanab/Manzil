// src/screens/components/FullScreenMediaViewer.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface FullScreenMediaViewerProps {
  media: string[]; // Array of media URLs (images and videos)
  initialIndex: number;
  onClose: () => void;
}

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const isVideo = (url: string): boolean => {
  const lower = url.toLowerCase();
  return lower.endsWith('.mp4') || lower.endsWith('.mov');
};

const FullScreenMediaViewer: React.FC<FullScreenMediaViewerProps> = ({
  media,
  initialIndex,
  onClose,
}) => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    translateY.value = event.nativeEvent.translationY;
  };

  const handleGestureEnd = (event: PanGestureHandlerGestureEvent) => {
    if (Math.abs(event.nativeEvent.translationY) > 200) {
      onClose();
    } else {
      translateY.value = withSpring(0);
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    if (isVideo(item)) {
      return (
        <Video
          source={{ uri: item }}
          style={styles.media}
          controls
          paused={false} // auto-play
          repeat
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Image
          source={{ uri: item }}
          style={styles.media}
          resizeMode="contain"
        />
      );
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGesture} onEnded={handleGestureEnd}>
        <Animated.View style={[styles.fullScreenContainer, animatedStyle]}>
          <FlatList
            data={media}
            horizontal
            pagingEnabled
            initialScrollIndex={initialIndex}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            getItemLayout={(_, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </Animated.View>
      </PanGestureHandler>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        accessible={true}
        accessibilityLabel="Close full screen view"
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Overlay the entire screen
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  fullScreenContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
  },
  media: {
    width: screenWidth,
    height: screenHeight,
  },
  closeButton: {
    position: 'absolute',
    top: 50, // Adjusted as needed for a lower close button
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FullScreenMediaViewer;
