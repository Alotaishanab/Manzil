import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  BedIcon,
  BathroomIcon,
  FloorIcon,
  LivingRoomIcon,
  DirectionIcon,
} from '@svgs';
import { CircularPickerComponent } from '../molecules/CircularPickerComponent';
import { DirectionPicker } from '@components'; // Import your custom DirectionPicker

const MAX_OPTIONS = 10;

/**
 * Helper to generate numeric options.
 */
const generateOptions = (max) => Array.from({ length: max }, (_, i) => i + 1);

/**
 * OptionPicker: A reusable field component for numeric values (e.g., Beds, Baths, etc.)
 * Displays an icon above a label and a circular picker.
 */
const OptionPicker = ({ label, value, setValue, options, Icon }) => {
  return (
    <View style={styles.optionContainer}>
      <Icon width={28} height={28} fill="#333" style={styles.optionIcon} />
      <Text style={styles.optionLabel}>{label}</Text>
      <CircularPickerComponent
        currentValue={value}
        setValue={setValue}
        options={options}
        size={100} // Adjusted for a compact, modern look
        strokeWidth={8}
        indicatorStyle={styles.indicator}
      />
    </View>
  );
};

/**
 * HouseComponent: Displays pickers for Beds, Baths, Floors, Living Rooms and a custom DirectionPicker for Direction.
 */
export const HouseComponent = ({
  beds,
  setBeds,
  baths,
  setBaths,
  floors,
  setFloors,
  livingRooms,
  setLivingRooms,
  direction,
  setDirection,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Row for Beds & Baths */}
      <View style={styles.rowContainer}>
        <OptionPicker
          label="Beds"
          value={beds}
          setValue={setBeds}
          options={generateOptions(MAX_OPTIONS)}
          Icon={BedIcon}
        />
        <OptionPicker
          label="Baths"
          value={baths}
          setValue={setBaths}
          options={generateOptions(MAX_OPTIONS)}
          Icon={BathroomIcon}
        />
      </View>

      {/* Row for Floors & Living Rooms */}
      <View style={styles.rowContainer}>
        <OptionPicker
          label="Floors"
          value={floors}
          setValue={setFloors}
          options={generateOptions(MAX_OPTIONS)}
          Icon={FloorIcon}
        />
        <OptionPicker
          label="Living Rooms"
          value={livingRooms}
          setValue={setLivingRooms}
          options={generateOptions(MAX_OPTIONS)}
          Icon={LivingRoomIcon}
        />
      </View>

      {/* Direction Picker */}
      <View style={styles.directionContainer}>
        <Text style={styles.optionLabel}>Direction</Text>
        <DirectionPicker currentValue={direction} setValue={setDirection} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    // Subtle shadow for a modern, tactile feel:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionIcon: {
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  directionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default HouseComponent;
