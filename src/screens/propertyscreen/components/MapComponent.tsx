import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Jost',
  },
  map: {
    width: '100%',
    height: 300, // Increased height to make the map container bigger
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default MapComponent;
