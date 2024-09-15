import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BedIcon, BathroomIcon, FloorIcon, LivingRoomIcon } from '@svgs';
import ScrollPicker from './ScrollPicker';

export const HouseComponent = ({ beds, setBeds, baths, setBaths, floors, setFloors, livingRooms, setLivingRooms }) => {
  console.log('HouseComponent - Current Values:', { beds, baths, floors, livingRooms });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ScrollPicker
          title="Beds"
          currentValue={beds}
          setValue={(value) => {
            setBeds(value);
            console.log('Updated Beds:', value); // Log the updated value
          }}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={BedIcon}
        />
        <ScrollPicker
          title="Baths"
          currentValue={baths}
          setValue={(value) => {
            setBaths(value);
            console.log('Updated Baths:', value); // Log the updated value
          }}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={BathroomIcon}
        />
      </View>
      <View style={styles.row}>
        <ScrollPicker
          title="Floors"
          currentValue={floors}
          setValue={(value) => {
            setFloors(value);
            console.log('Updated Floors:', value); // Log the updated value
          }}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={FloorIcon}
        />
        <ScrollPicker
          title="Living Rooms"
          currentValue={livingRooms}
          setValue={(value) => {
            setLivingRooms(value);
            console.log('Updated Living Rooms:', value); // Log the updated value
          }}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={LivingRoomIcon}
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

export default HouseComponent;
