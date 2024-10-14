import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VisaCardIcon } from '@svgs'; // Assuming you have an SVG for Visa/MasterCard icons

export const HistoryCard = ({ cardNumber }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardName}>Abdullah AlOtaishan</Text> 
      <Text style={styles.cardNumber}>{cardNumber}</Text>
      <VisaCardIcon width={40} height={40} style={styles.cardIcon} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#007AFF', // Replace with a gradient or bank-specific background
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: 2,
  },
  cardIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
