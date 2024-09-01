// components/UserLocationsComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface UserLocation {
  id: number;
  name: string;
  value: string;
}

interface UserLocationsComponentProps {
  userLocations: UserLocation[];
}

const UserLocationsComponent: React.FC<UserLocationsComponentProps> = ({ userLocations }) => (
  <View style={styles.userLocationContainer}>
    <Text style={styles.userLocationTitle}>User Locations</Text>
    {userLocations.map((location) => (
      <View key={location.id} style={styles.locationItem}>
        <Text style={styles.locationText}>{location.name}</Text>
        <Text style={styles.locationValue}>{location.value}</Text>
      </View>
    ))}
  </View>
);

export default UserLocationsComponent;
