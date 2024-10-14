import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Beds Row */}
      <View style={styles.row}>
        <Text style={styles.categoryTitle}>Beds</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ScrollPicker
            title="Beds"
            currentValue={beds}
            setValue={setBeds}
            options={optionsGenerator(10)}
            IconComponent={BedIcon}
          />
        </ScrollView>
      </View>

      {/* Baths Row */}
      <View style={styles.row}>
        <Text style={styles.categoryTitle}>Baths</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ScrollPicker
            title="Baths"
            currentValue={baths}
            setValue={setBaths}
            options={optionsGenerator(10)}
            IconComponent={BathroomIcon}
          />
        </ScrollView>
      </View>

      {/* Floors Row */}
      <View style={styles.row}>
        <Text style={styles.categoryTitle}>Floors</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ScrollPicker
            title="Floors"
            currentValue={floors}
            setValue={setFloors}
            options={optionsGenerator(10)}
            IconComponent={FloorIcon}
          />
        </ScrollView>
      </View>

      {/* Living Rooms Row */}
      <View style={styles.row}>
        <Text style={styles.categoryTitle}>Living Rooms</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ScrollPicker
            title="Living Rooms"
            currentValue={livingRooms}
            setValue={setLivingRooms}
            options={optionsGenerator(10)}
            IconComponent={LivingRoomIcon}
          />
        </ScrollView>
      </View>

      {/* Direction Row */}
      <View style={styles.row}>
        <Text style={styles.categoryTitle}>Direction</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ScrollPicker
            title="Direction"
            currentValue={direction}
            setValue={setDirection}
            options={['North', 'East', 'South', 'West']}
            IconComponent={LivingRoomIcon} // Replace with compass icon if available
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F7F8FA',
  },
  row: {
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
    paddingLeft: 5,
  },
});

export default HouseComponent;
