import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollPicker } from '../molecules/ScrollPicker';
import { BedIcon, BathroomIcon } from '@svgs'; // Assume these icons exist

interface WorkersResidenceProps {
  beds: number;
  setBeds: (value: number) => void;
  baths: number;
  setBaths: (value: number) => void;
  direction: string;
  setDirection: (value: string) => void;
}

export const WorkersResidenceComponent: React.FC<WorkersResidenceProps> = ({
  beds,
  setBeds,
  baths,
  setBaths,
  direction,
  setDirection,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ScrollPicker
          title="Number of Beds"
          currentValue={beds}
          setValue={setBeds}
          options={Array.from({ length: 20 }, (_, i) => i + 1)}
          IconComponent={BedIcon}
        />
        <ScrollPicker
          title="Number of Baths"
          currentValue={baths}
          setValue={setBaths}
          options={Array.from({ length: 5 }, (_, i) => i + 1)}
          IconComponent={BathroomIcon}
        />
      </View>
      <View style={styles.row}>
        <ScrollPicker
          title="Direction"
          currentValue={direction}
          setValue={setDirection}
          options={['North', 'South', 'East', 'West']}
          IconComponent={BathroomIcon}
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

export default WorkersResidenceComponent;
