import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

export const SwipeableCard = ({ children }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 150) {
          Animated.spring(pan, {
            toValue: { x: 500, y: 0 },
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dx < -150) {
          Animated.spring(pan, {
            toValue: { x: -500, y: 0 },
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View {...panResponder.panHandlers} style={[pan.getLayout()]}>
      {children}
    </Animated.View>
  );
};
