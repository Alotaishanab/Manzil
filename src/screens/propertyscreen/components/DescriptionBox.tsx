import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { fonts } from '../../../assets/fonts/index'; // Import fonts

interface DescriptionBoxProps {
  description: string;
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // Animation value for height
  const scaleAnim = useRef(new Animated.Value(1)).current; // Animation value for scaling

  // Function to toggle expand and animate
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Function to handle press-in effect
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Slightly scale down
      useNativeDriver: true,
    }).start();
  };

  // Function to handle press-out effect
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to normal
      useNativeDriver: true,
    }).start();
    toggleExpand();
  };

  // Trigger animation based on expanded state
  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300, // Duration of animation
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  // Interpolated height based on animation value
  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // Adjust outputRange for your content's height
  });

  // Interpolated opacity based on animation value
  const animatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.outerContainer}>
      <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>
            {description}
          </Text>
          <Text style={styles.showMoreText}>
            {expanded ? 'Show Less' : 'Show More'}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    paddingVertical: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    fontFamily: fonts.primary.bold, 
  },
  description: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.primary.regular,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  additionalInfo: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    fontFamily: fonts.primary.regular,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  showMoreText: {
    marginTop: 10,
    color: '#1E90FF',
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
  },
});

export default DescriptionBox;
