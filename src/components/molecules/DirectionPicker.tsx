import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DirectionIcon } from '@svgs'; // Ensure that DirectionIcon is properly exported

/**
 * DirectionPicker Component
 * Displays a row of direction cards (North, East, South, West).
 * When tapped, the selected option is highlighted with a green border and light green background.
 */
export const DirectionPicker = ({
  currentValue,
  setValue,
  options = ['North', 'East', 'South', 'West'],
}) => {
  return (
    <View style={styles.container}>
      {options.map((direction) => {
        const isSelected = direction === currentValue;
        return (
          <TouchableOpacity
            key={direction}
            onPress={() => setValue(direction)}
            style={[styles.option, isSelected && styles.optionSelected]}
          >
            <DirectionIcon
              width={24}
              height={24}
              fill={isSelected ? '#4CAF50' : '#8B4513'}
              style={styles.icon}
            />
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {direction}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  option: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#8B4513', // Warm brown for unselected state
    marginHorizontal: 5,
  },
  optionSelected: {
    borderColor: '#4CAF50',      // Green for selected state
    backgroundColor: '#E8F5E9',  // Light green background
  },
  icon: {
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
  },
  textSelected: {
    color: '#4CAF50',
  },
});

export default DirectionPicker;
