import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ParkingIcon } from '@svgs'; // Assuming you have icons for these
import { ScrollPicker } from '../molecules/ScrollPicker';

export const OfficeComponent = ({
  floors,
  setFloors,
  parkingSpaces,
  setParkingSpaces,
  direction,
  setDirection,
}) => {
  console.log('OfficeComponent - Current Values:', {
    floors,
    parkingSpaces,
    direction,
  });

  return (
    <View style={styles.container}>
      <ScrollPicker
        title="Number of Floors"
        currentValue={floors}
        setValue={(value) => {
          setFloors(value);
          console.log('Updated Floors:', value);
        }}
        options={Array.from({ length: 10 }, (_, i) => i + 1)} // Generates options 1-10
        IconComponent={ParkingIcon}
      />

      <ScrollPicker
        title="Available Parking Spaces"
        currentValue={parkingSpaces}
        setValue={(value) => {
          setParkingSpaces(value);
          console.log('Updated Parking Spaces:', value);
        }}
        options={Array.from({ length: 51 }, (_, i) => i)} // Generates options 0-50
        IconComponent={ParkingIcon}
      />

      <ScrollPicker
        title="Direction"
        currentValue={direction}
        setValue={(value) => {
          setDirection(value);
          console.log('Updated Direction:', value);
        }}
        options={['North', 'South', 'East', 'West']}
        IconComponent={ParkingIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OfficeComponent;
