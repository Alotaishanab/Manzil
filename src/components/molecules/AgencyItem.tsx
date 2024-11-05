// src/components/AgencyItem.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../assets/fonts'; // Ensure correct path
import { Colors } from '../../constants/Colors'; // Ensure correct path

interface AgencyItemProps {
  image: any; // Image source: require('path') or { uri: 'https://...' }
  name: string;
  onPress?: () => void; // Optional press handler
}

export const AgencyItem: React.FC<AgencyItemProps> = ({ image, name, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={`Agency: ${name}`}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.nameText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15, // Spacing between items
  },
  imageContainer: {
    width: 80, // 20x20 pixels as per user request
    height: 80,
    borderRadius: 10, // Half of width and height to make it circular
    overflow: 'hidden',
    backgroundColor: '#ccc', // Placeholder color in case image fails to load
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // Adds a border
    borderColor: '#ddd',
    shadowColor: '#000', // Adds a shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2, // For Android shadow
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameText: {
    marginTop: 5,
    fontSize: 14, // Smaller font size for the small circle
    color: '#000',
    textAlign: 'center',
    fontFamily: fonts.primary.regular, // Replace with your actual font
  },
});

export default AgencyItem;
