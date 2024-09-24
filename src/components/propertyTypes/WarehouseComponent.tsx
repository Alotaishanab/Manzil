import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollPicker from '../molecules/ScrollPicker';
import { StorageIcon } from '@svgs'; // Assume these icons exist

interface WarehouseProps {
  numberOfGates: number;
  setNumberOfGates: (value: number) => void;
  loadingDocks: number;
  setLoadingDocks: (value: number) => void;
  storageCapacity: number;
  setStorageCapacity: (value: number) => void;
}

export const WarehouseComponent: React.FC<WarehouseProps> = ({
  numberOfGates,
  setNumberOfGates,
  loadingDocks,
  setLoadingDocks,
  storageCapacity,
  setStorageCapacity,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ScrollPicker
          title="Number of Gates"
          currentValue={numberOfGates}
          setValue={setNumberOfGates}
          options={Array.from({ length: 10 }, (_, i) => i + 1)}
          IconComponent={StorageIcon}
        />
        <ScrollPicker
          title="Loading Docks"
          currentValue={loadingDocks}
          setValue={setLoadingDocks}
          options={Array.from({ length: 6 }, (_, i) => i)}
          IconComponent={StorageIcon}
        />
      </View>
      <View style={styles.row}>
        <ScrollPicker
          title="Storage Capacity (m³)"
          currentValue={storageCapacity}
          setValue={setStorageCapacity}
          options={Array.from({ length: 100 }, (_, i) => (i + 1) * 100)}
          IconComponent={StorageIcon}
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

export default WarehouseComponent;
