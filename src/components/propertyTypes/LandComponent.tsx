import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LivingRoomIcon } from '@svgs';
import ScrollPicker from '../molecules/ScrollPicker';

export const LandComponent = ({
  direction,
  setDirection,
  numberOfStreets,
  setNumberOfStreets,
}) => {
  console.log('LandComponent - Current Values:', {
    direction,
    numberOfStreets,
  });

  return (
    <View style={styles.container}>
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

      <ScrollPicker
        title="Number of Streets"
        currentValue={numberOfStreets}
        setValue={(value) => {
          setNumberOfStreets(value);
          console.log('Updated Number of Streets:', value);
        }}
        options={Array.from({ length: 4 }, (_, i) => i + 1)}
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

export default LandComponent;
