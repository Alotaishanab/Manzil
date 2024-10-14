// DynamicCard.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const DynamicCard = ({ card }) => {
  return (
    <View style={[styles.cardContainer, { backgroundColor: card.color }]}>
      {/* Card Background */}
      {card.type !== 'default' ? (
        <Image source={{ uri: `https://s3-bucket-url/${card.type}.png` }} style={styles.cardBackground} />
      ) : (
        <View style={styles.defaultCardBackground} />
      )}

      {/* Card Details */}
      <View style={styles.cardDetails}>
        <Text style={styles.cardName}>Abdullah AlOtaishan</Text>
        <Text style={styles.cardNumber}>**** **** **** {card.number.slice(-4)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    padding: 20,
    overflow: 'hidden',
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  defaultCardBackground: {
    backgroundColor: '#d9d9d9',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
  },
  cardDetails: {
    zIndex: 10,
    marginTop: 50,
  },
  cardName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: 1.5,
    marginTop: 10,
  },
});
