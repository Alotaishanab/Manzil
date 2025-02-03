import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularPicker from 'react-native-circular-picker';

const STEPS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export function CircularPickerComponent({
  currentValue = 0,
  setValue,
  size = 140,
  strokeWidth = 8,
  indicatorStyle,
}) {
  // Local state to control the picker and display
  const [pickerValue, setPickerValue] = useState(currentValue);
  const [displayValue, setDisplayValue] = useState(Math.round(currentValue / 10) + 1);

  useEffect(() => {
    // Sync external value if provided
    setPickerValue(currentValue);
    setDisplayValue(Math.round(currentValue / 10) + 1);
  }, [currentValue]);

  const handleOnChange = (rawValue) => {
    // Snap to the nearest value in STEPS
    const snappedValue = STEPS.reduce((prev, curr) =>
      Math.abs(curr - rawValue) < Math.abs(prev - rawValue) ? curr : prev,
      STEPS[0]
    );
    setPickerValue(snappedValue);
    const newDisplay = Math.round(snappedValue / 10) + 1;
    setDisplayValue(newDisplay);
    if (setValue) setValue(newDisplay);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.pickerWrapper, { width: size, height: size }]}>
        <CircularPicker
          value={pickerValue}
          onChange={handleOnChange}
          size={size}
          steps={STEPS}
          stepSize={10}
          strokeWidth={strokeWidth}
          indicatorStyle={indicatorStyle || styles.indicator}
          // Use a subtle green gradient for the track
          startGradient={['#C8E6C9', '#A5D6A7']}
          endGradient={['#C8E6C9', '#A5D6A7']}
        />
        <Text style={styles.valueText}>{displayValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    position: 'absolute',
    fontSize: 26,
    fontWeight: 'bold',
    // Use a vibrant green for the main value
    color: '#4CAF50',
  },
  indicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    // Warm brown for the indicator
    backgroundColor: '#8B4513',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
