import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BedIcon, BathroomIcon, LivingRoomIcon } from '@svgs'; // Assuming you have icons for these
import ScrollPicker from '../molecules/ScrollPicker';

export const TowerComponent = ({
  rooms,
  setRooms,
  baths,
  setBaths,
  numberOfUnits,
  setNumberOfUnits,
  floors,
  setFloors,
  direction,
  setDirection,
}) => {
  console.log('TowerComponent - Current Values:', {
    rooms,
    baths,
    numberOfUnits,
    floors,
    direction,
  });

  return (
    <View style={styles.container}>
      <ScrollPicker
        title="Number of Rooms per Unit"
        currentValue={rooms}
        setValue={(value) => {
          setRooms(value);
          console.log('Updated Rooms:', value);
        }}
        options={Array.from({ length: 10 }, (_, i) => i + 1)}
        IconComponent={BedIcon}
      />

      <ScrollPicker
        title="Number of Bathrooms per Unit"
        currentValue={baths}
        setValue={(value) => {
          setBaths(value);
          console.log('Updated Baths:', value);
        }}
        options={Array.from({ length: 5 }, (_, i) => i + 1)}
        IconComponent={BathroomIcon}
      />

      <ScrollPicker
        title="Number of Units"
        currentValue={numberOfUnits}
        setValue={(value) => {
          setNumberOfUnits(value);
          console.log('Updated Units:', value);
        }}
        options={Array.from({ length: 50 }, (_, i) => i + 1)}
        IconComponent={LivingRoomIcon}
      />

      <ScrollPicker
        title="Number of Floors"
        currentValue={floors}
        setValue={(value) => {
          setFloors(value);
          console.log('Updated Floors:', value);
        }}
        options={Array.from({ length: 50 }, (_, i) => i + 1)}
        IconComponent={LivingRoomIcon}
      />

      <ScrollPicker
        title="Direction"
        currentValue={direction}
        setValue={(value) => {
          setDirection(value);
          console.log('Updated Direction:', value);
        }}
        options={['North', 'South', 'East', 'West']}
        IconComponent={LivingRoomIcon}
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

export default TowerComponent;
