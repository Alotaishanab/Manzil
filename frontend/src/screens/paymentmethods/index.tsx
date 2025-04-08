// PaymentMethods.js

import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Animated, Text, View } from 'react-native';
import { DynamicCard } from './components/DynamicCard'; // Adjust the import path accordingly
import { HeaderBackButtonTitle } from '@components';    // Adjust the import path accordingly
import { useIntl } from '@context';                     // Adjust the import path accordingly
import { useNavigation } from '@react-navigation/native';

const CARD_HEIGHT = 200;
const CARD_OFFSET = 30;
const INITIAL_CARD_POSITION = 100; // Adjust this value to position cards lower on the screen

export const PaymentMethods = () => {
  const { intl } = useIntl();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [cardOrder, setCardOrder] = useState([0, 1, 2, 3, 4]); // Initial card order
  const navigation = useNavigation();

  const [cards, setCards] = useState([
    { id: 1, number: '4567 8901 2345 6789', type: 'visa', color: '#FFB6C1' },
    { id: 2, number: '1234 5678 9012 3456', type: 'mastercard', color: '#ADD8E6' },
    { id: 3, number: '1111 2222 3333 4444', type: 'default', color: '#90EE90' },
    { id: 4, number: '5555 6666 7777 8888', type: 'default', color: '#FFD700' },
    { id: 5, number: '9999 8888 7777 6666', type: 'mastercard', color: '#FF6347' },
  ]);

  // Create animation values for each card
  const animationValues = useRef(cards.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Update animationValues if cards array changes (e.g., when a card is deleted)
    if (animationValues.length !== cards.length) {
      const newAnimationValues = cards.map((_, idx) => animationValues[idx] || new Animated.Value(0));
      animationValues.splice(0, animationValues.length, ...newAnimationValues);
    }
  }, [cards]);

  const handleCardPress = (index) => {
    const previousSelectedIndex = selectedCardIndex;

    if (selectedCardIndex === index) {
      // Deselect the card
      animateCards(null, previousSelectedIndex);
      setSelectedCardIndex(null);
    } else {
      // Select the new card
      animateCards(index, previousSelectedIndex);
      setSelectedCardIndex(index);
    }
  };

  const animateCards = (selectedIndex, previousSelectedIndex) => {
    let newOrder = [...cardOrder];

    if (selectedIndex !== null) {
      if (previousSelectedIndex !== null && previousSelectedIndex !== selectedIndex) {
        // Swap the positions of the selected card and the previously selected card
        const selectedCardPosition = newOrder.indexOf(selectedIndex);
        const previousCardPosition = newOrder.indexOf(previousSelectedIndex);

        newOrder[selectedCardPosition] = previousSelectedIndex;
        newOrder[previousCardPosition] = selectedIndex;
      } else {
        // Move the selected card to the top
        newOrder = [selectedIndex, ...newOrder.filter((i) => i !== selectedIndex)];
      }
    } else {
      // No card is selected; reset to original order
      newOrder = cards.map((_, idx) => idx);
    }

    setCardOrder(newOrder);

    Animated.parallel(
      cards.map((_, idx) => {
        const cardIndex = newOrder.indexOf(idx);
        const animValue = animationValues[idx];

        // Slightly move the selected card up and others down
        let toValue = INITIAL_CARD_POSITION + cardIndex * (CARD_OFFSET + CARD_HEIGHT * 0.1);

        if (selectedIndex !== null) {
          if (idx === selectedIndex) {
            toValue -= 20; // Move selected card up by 20 units
          } else {
            toValue += 20; // Move other cards down by 20 units
          }
        }

        return Animated.timing(animValue, {
          toValue,
          duration: 300,
          useNativeDriver: true,
        });
      })
    ).start();
  };

  const handleDeleteCard = () => {
    if (selectedCardIndex !== null) {
      const updatedCards = cards.filter((_, idx) => idx !== selectedCardIndex);

      // Remove the card's animation value
      animationValues.splice(selectedCardIndex, 1);

      // Update cardOrder to reflect the removed card
      const updatedCardOrder = cardOrder
        .filter((idx) => idx !== selectedCardIndex)
        .map((idx) => (idx > selectedCardIndex ? idx - 1 : idx));
      setCardOrder(updatedCardOrder);

      setCards(updatedCards);
      setSelectedCardIndex(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBackButtonTitle text={intl.formatMessage({ id: 'paymentMethodScreen.header' })} />

      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          const translateY = animationValues[index];

          const zIndex = selectedCardIndex === index ? 100 : cards.length - cardOrder.indexOf(index);

          return (
            <Animated.View
              key={card.id}
              style={[
                styles.cardWrapper,
                {
                  transform: [{ translateY }],
                  zIndex,
                },
              ]}
            >
              <TouchableOpacity activeOpacity={1} onPress={() => handleCardPress(index)}>
                <DynamicCard card={card} />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* Delete Button */}
      {selectedCardIndex !== null && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCard}>
          <Text style={styles.deleteButtonText}>Delete Card</Text>
        </TouchableOpacity>
      )}

      {/* Add Card Link */}
      <TouchableOpacity onPress={() => navigation.navigate('AddCardScreen')}>
        <Text style={styles.addCardLink}>Add New Card</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align cards to the top
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  cardWrapper: {
    position: 'absolute',
    width: '90%',
    height: CARD_HEIGHT,
  },
  deleteButton: {
    backgroundColor: '#FF4136',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: '5%',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addCardLink: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default PaymentMethods;
