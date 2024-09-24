import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BedIcon, BathroomIcon, FloorIcon, LivingRoomIcon } from '@svgs';
import ScrollPicker from '../molecules/ScrollPicker';

export const ApartmentComponent = ({
  rooms,
  setRooms,
  baths,
  setBaths,
  floorNumber,
  setFloorNumber,
  livingRooms,
  setLivingRooms,
  floors,
  setFloors,
  direction,
  setDirection,
}) => {
  console.log('ApartmentComponent - Current Values:', {
    rooms,
    baths,
    floorNumber,
    livingRooms,
    floors,
    direction,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ScrollPicker
          title="Rooms"
          currentValue={rooms}
          setValue={(value) => {
            setRooms(value);
            console.log('Updated Rooms:', value);
          }}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={BedIcon}
        />
        <ScrollPicker
          title="Baths"
          currentValue={baths}
          setValue={(value) => {
            setBaths(value);
            console.log('Updated Baths:', value);
          }}
          options={Array.from({ length: 5 }, (_, i) => i + 1)}
          IconComponent={BathroomIcon}
        />
      </View>

      <View style={styles.row}>
        <ScrollPicker
          title="Floor Number"
          currentValue={floorNumber}
          setValue={(value) => {
            setFloorNumber(value);
            console.log('Updated Floor Number:', value);
          }}
          options={Array.from({ length: 50 }, (_, i) => i + 1)}
          IconComponent={FloorIcon}
        />
        <ScrollPicker
          title="Living Rooms"
          currentValue={livingRooms}
          setValue={(value) => {
            setLivingRooms(value);
            console.log('Updated Living Rooms:', value);
          }}
          options={Array.from({ length: 3 }, (_, i) => i + 1)}
          IconComponent={LivingRoomIcon}
        />
      </View>

      <View style={styles.row}>
        <ScrollPicker
          title="Floors"
          currentValue={floors}
          setValue={(value) => {
            setFloors(value);
            console.log('Updated Floors:', value);
          }}
          options={Array.from({ length: 50 }, (_, i) => i + 1)}
          IconComponent={FloorIcon}
        />
        <ScrollPicker
          title="Direction"
          currentValue={direction}
          setValue={(value) => {
            setDirection(value);
            console.log('Updated Direction:', value);
          }}
          options={['North', 'South', 'East', 'West']}
          IconComponent={FloorIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ApartmentComponent;
