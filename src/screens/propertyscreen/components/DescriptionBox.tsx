import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { fonts } from '../../../assets/fonts/index'; // Import fonts

const DescriptionBox: React.FC = () => {
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
            {/* Placeholder for API data */}
            This is a brief description of the property. It provides an overview of the key features and unique selling points of the property.
          </Text>
          <Animated.View style={{ height: animatedHeight, opacity: animatedOpacity, overflow: 'hidden' }}>
            <Text style={styles.additionalInfo}>
              {/* Placeholder for API data */}
              More detailed information about the property can be shown here, including amenities, nearby attractions, and historical significance.
            </Text>
          </Animated.View>
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
    borderRadius: 15, // Adjusted to match consistent card styling
    elevation: 3, // Consistent shadow for Android
    shadowColor: '#000', // Consistent shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    paddingVertical: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16, // Consistent font size for titles
    marginBottom: 10,
    color: '#000',
    textAlign: 'center', // Center the title
    fontFamily: fonts.primary.bold, // Use bold font for emphasis
  },
  description: {
    fontSize: 14, // Smaller font size for main description
    color: '#000',
    fontFamily: fonts.primary.regular,
    lineHeight: 20, // Increase line spacing for readability
    paddingHorizontal: 10, // Padding for consistent text alignment
  },
  additionalInfo: {
    fontSize: 14, // Consistent font size with description
    color: '#000',
    marginTop: 10,
    fontFamily: fonts.primary.regular,
    lineHeight: 20, // Increase line spacing for readability
    paddingHorizontal: 10, // Consistent padding
  },
  showMoreText: {
    marginTop: 10,
    color: '#1E90FF', // Change color to a more noticeable blue
    fontSize: 14, // Adjusted font size slightly smaller
    fontFamily: fonts.primary.bold, // Use bold font for better emphasis
    textAlign: 'center',
  },
});

export default DescriptionBox;
