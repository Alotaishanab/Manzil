import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const ContactButton: React.FC = () => {
  return (
    <View style={styles.contactButtonContainer}>
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contactButtonContainer: {
    position: 'absolute',
    top: 810, // Adjust to position the button vertically as needed
    alignSelf: 'center', // Centers the button horizontally
    zIndex: 102,
    width: 380, // Fixed width for consistent size
  },
  contactButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Jost',
  },
});

export default ContactButton;
