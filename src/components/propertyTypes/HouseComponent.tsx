import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BedIcon, BathroomIcon, FloorIcon, LivingRoomIcon } from '@svgs';
import { ScrollPicker } from '../molecules/ScrollPicker';

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
  console.log('HouseComponent - Current Values:', { beds, baths, floors, livingRooms, direction });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ScrollPicker
          title="Beds"
          currentValue={beds}
          setValue={setBeds}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={BedIcon}
        />
        <ScrollPicker
          title="Baths"
          currentValue={baths}
          setValue={setBaths}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={BathroomIcon}
        />
      </View>
      <View style={styles.row}>
        <ScrollPicker
          title="Floors"
          currentValue={floors}
          setValue={setFloors}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={FloorIcon}
        />
        <ScrollPicker
          title="Living Rooms"
          currentValue={livingRooms}
          setValue={setLivingRooms}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={LivingRoomIcon}
        />
      </View>
      <View style={styles.row}>
        <ScrollPicker
          title="Direction"
          currentValue={direction}
          setValue={setDirection}
          options={['North', 'East', 'South', 'West']}
          IconComponent={LivingRoomIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
});

export default HouseComponent;
