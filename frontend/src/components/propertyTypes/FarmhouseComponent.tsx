import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BedIcon, BathroomIcon, LivingRoomIcon} from '@svgs';
import { ScrollPicker } from '../molecules/ScrollPicker';

export const FarmhouseComponent = ({
  beds,
  setBeds,
  baths,
  setBaths,
  livingRooms,
  setLivingRooms,
  direction,
  setDirection,
}) => {
  console.log('FarmhouseComponent - Current Values:', {
    beds,
    baths,
    livingRooms,
    direction,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ScrollPicker
          title="Beds"
          currentValue={beds}
          setValue={(value) => {
            setBeds(value);
            console.log('Updated Beds:', value);
          }}
          options={Array.from({ length: 20 }, (_, i) => i + 1)}
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
          title="Living Rooms"
          currentValue={livingRooms}
          setValue={(value) => {
            setLivingRooms(value);
            console.log('Updated Living Rooms:', value);
          }}
          options={Array.from({ length: 3 }, (_, i) => i + 1)}
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

export default FarmhouseComponent;
