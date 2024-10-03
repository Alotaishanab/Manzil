import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BedIcon, BathroomIcon, FloorIcon, LivingRoomIcon } from '@svgs';
import { ScrollPicker } from '../molecules/ScrollPicker';

const optionsGenerator = (length) => Array.from({ length }, (_, i) => i + 1);

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

  const scrollPickerData = [
    { title: 'Beds', value: beds, setter: setBeds, options: optionsGenerator(10), icon: BedIcon },
    { title: 'Baths', value: baths, setter: setBaths, options: optionsGenerator(10), icon: BathroomIcon },
    { title: 'Floors', value: floors, setter: setFloors, options: optionsGenerator(10), icon: FloorIcon },
    { title: 'Living Rooms', value: livingRooms, setter: setLivingRooms, options: optionsGenerator(10), icon: LivingRoomIcon },
    { title: 'Direction', value: direction, setter: setDirection, options: ['North', 'East', 'South', 'West'], icon: LivingRoomIcon },
  ];

  return (
    <View style={styles.container}>
      {/* Arrange two items per row */}
      <View style={styles.row}>
        <ScrollPicker
          title="Beds"
          currentValue={beds}
          setValue={setBeds}
          options={optionsGenerator(10)}
          IconComponent={BedIcon}
        />
        <ScrollPicker
          title="Baths"
          currentValue={baths}
          setValue={setBaths}
          options={optionsGenerator(10)}
          IconComponent={BathroomIcon}
        />
      </View>

      <View style={styles.row}>
        <ScrollPicker
          title="Floors"
          currentValue={floors}
          setValue={setFloors}
          options={optionsGenerator(10)}
          IconComponent={FloorIcon}
        />
        <ScrollPicker
          title="Living Rooms"
          currentValue={livingRooms}
          setValue={setLivingRooms}
          options={optionsGenerator(10)}
          IconComponent={LivingRoomIcon}
        />
      </View>

      {/* Single ScrollPicker centered */}
      <View style={styles.centeredRow}>
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
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the single item
    width: '100%',
    marginBottom: 20,
  },
});

export default HouseComponent;
