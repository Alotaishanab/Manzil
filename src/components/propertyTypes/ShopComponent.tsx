import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LivingRoomIcon } from '@svgs'; // Assuming you have icons for these
import { ScrollPicker } from '../molecules/ScrollPicker';

export const ShopComponent = ({
  footTraffic,
  setFootTraffic,
  proximity,
  setProximity,
  errors,
}) => {
  console.log('ShopComponent - Current Values:', {
    footTraffic,
    proximity,
  });

  return (
    <View style={styles.container}>
      <ScrollPicker
        title="Foot Traffic"
        currentValue={footTraffic}
        setValue={(value) => {
          setFootTraffic(value);
          console.log('Updated Foot Traffic:', value);
        }}
        options={['High', 'Medium', 'Low']}
        IconComponent={LivingRoomIcon}
      />

      <ScrollPicker
        title="Proximity to Main Road"
        currentValue={proximity}
        setValue={(value) => {
          setProximity(value);
          console.log('Updated Proximity:', value);
        }}
        options={['Near Main Road', 'Far from Main Road']}
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

export default ShopComponent;
