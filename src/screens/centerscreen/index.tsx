// CenterScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation between screens
import { Colors } from '@colors';
import { fonts } from '@fonts';

export const CenterScreen = () => {
  const navigation = useNavigation();

  // Handle navigation for each action
  const handleAddProperty = () => {
    navigation.navigate('AddProperties');
  };

  const handlePromoteProperty = () => {
    navigation.navigate('PromoteProperty');
  };

  const handleRequestProperty = () => {
    navigation.navigate('RequestProperty');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Properties</Text>

      {/* Button for Add Property */}
      <TouchableOpacity style={styles.button} onPress={handleAddProperty}>
        <Text style={styles.buttonText}>Add Property</Text>
      </TouchableOpacity>

      {/* Button for Promote Property */}
      <TouchableOpacity style={styles.button} onPress={handlePromoteProperty}>
        <Text style={styles.buttonText}>Promote Property</Text>
      </TouchableOpacity>

      {/* Button for Request Property */}
      <TouchableOpacity style={styles.button} onPress={handleRequestProperty}>
        <Text style={styles.buttonText}>Request Property</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fonts.primary.bold,
    marginBottom: 40,
    color: Colors.light.headingTitle,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: Colors.light.primaryBtn,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontFamily: fonts.primary.medium,
  },
});

export default CenterScreen;
