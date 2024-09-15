import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';

export const ScrollPicker = ({ title, currentValue, setValue, options, IconComponent }) => {
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScrollEnd = (event) => {
    let index = Math.round(event.nativeEvent.contentOffset.x / 50);
    setValue(options[index]);
    HapticFeedback.trigger('selection'); // Enhanced haptic feedback
    console.log(`${title} selected value:`, options[index]); // Log the selected value
  };

  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.square}>
        <IconComponent width={60} height={60} style={styles.icon} />
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={50} // Snap to each number
            decelerationRate="fast"
            onMomentumScrollEnd={handleScrollEnd}
            contentContainerStyle={styles.scrollPickerContainer}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            bounces={true} // Enable bounce effect
          >
            {/* Add padding to center the selected item */}
            <View style={{ width: 25 }} />
            {options.map((value, index) => {
              const inputRange = [
                (index - 1) * 50,
                index * 50,
                (index + 1) * 50,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.2, 0.8], // Enhance the scale effect for better emphasis
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
              });
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.numberContainer}
                  onPress={() => {
                    scrollViewRef.current.scrollTo({ x: index * 50, animated: true });
                    setValue(value);
                    HapticFeedback.trigger('selection'); // Haptic feedback on press
                    console.log(`${title} pressed value:`, value); // Log the pressed value
                  }}
                >
                  <Animated.Text style={[
                    styles.numberText,
                    { transform: [{ scale }], opacity }
                  ]}>
                    {value}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
            {/* Add padding to ensure the last item centers */}
            <View style={{ width: 25 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '45%',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  square: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollPickerContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    width: 80, // Adjust width to ensure better scroll snapping
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  numberText: {
    fontSize: 24, // Base font size for scale effect
    color: '#333',
  },
});

export default ScrollPicker;
