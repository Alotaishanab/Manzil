import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useIntl } from '@context';

export const ProgressBar = ({ step, totalSteps }) => {
  const progressAnim = useRef(new Animated.Value(0)).current; // Animation reference for progress

  // Animate the progress of the current step indefinitely
  useEffect(() => {
    progressAnim.setValue(0);
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2500, // Duration for one complete load
        useNativeDriver: false,
      })
    ).start();
  }, [step]);

  // Create segments for the progress bar
  const segments = Array.from({ length: totalSteps }, (_, index) => index);

  return (
    <View style={styles.progressContainer}>
      {segments.map((_, index) => (
        <View key={index} style={styles.segmentContainer}>
          {/* Completed steps */}
          {index < (step - 1) && <View style={[styles.segment, styles.segmentCompleted]} />}
          
          {/* The current step */}
          {index === (step - 1) && (
            <Animated.View
              style={[
                styles.segment,
                styles.segmentInProgress,
                { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
              ]}
            />
          )}

          {/* Unfilled steps */}
          {index > (step - 1) && <View style={styles.segment} />}
        </View>
      ))}
    </View>
  );
};

export const PropertyStepHeader = ({ step, totalSteps }) => {
  const intl = useIntl();

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar step={step} totalSteps={totalSteps} />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width; // Get full screen width

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth - 32, // Full width with some padding
    height: 4, // Adjusted height for a narrow progress bar
    marginVertical: 10,
  },
  segmentContainer: {
    flex: 1,
    height: '100%',
    marginHorizontal: 1, // Small gap between segments
    position: 'relative',
  },
  segment: {
    height: '100%',
    backgroundColor: '#e0e0e0', // Unfilled color for future steps
    borderRadius: 5,
  },
  segmentCompleted: {
    backgroundColor: '#4caf50', // Color for completed steps
  },
  segmentInProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#4caf50', // Color for the current step's progress
    borderRadius: 5,
  },
});

export default PropertyStepHeader;
