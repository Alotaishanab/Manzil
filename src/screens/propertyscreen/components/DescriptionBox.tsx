import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const DescriptionBox: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // Animation value for height

  // Function to toggle expand and animate
  const toggleExpand = () => {
    setExpanded(!expanded);
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
    outputRange: [0, 100], // Adjust outputRange for your content's height
  });

  // Interpolated opacity based on animation value
  const animatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity style={styles.container} onPress={toggleExpand}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20, // Increased padding for a larger box
    marginVertical: 10, // Consistent margin to reduce gaps
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    textAlign: 'center', // Center the title
    fontFamily: 'fonts.primary.regular', // Changed to use the primary font
  },
  description: {
    fontSize: 20, // Updated font size to 20
    color: '#000',
    fontFamily: 'fonts.primary.regular', // Changed to use the primary font
  },
  additionalInfo: {
    fontSize: 20, // Updated font size to 20
    color: '#000',
    marginTop: 10,
    fontFamily: 'fonts.primary.regular', // Changed to use the primary font
  },
  showMoreText: {
    marginTop: 10,
    color: 'blue',
    fontSize: 20, // Updated font size to 20
    fontFamily: 'fonts.primary.regular', // Changed to use the primary font
    textAlign: 'center', // Center the "Show More" text
  },
});

export default DescriptionBox;
