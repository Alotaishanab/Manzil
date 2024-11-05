// src/components/Survey.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import { fonts } from '../../assets/fonts';

interface SurveyProps {
  question: string;
  onYes: () => void;
  onNo: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const Survey: React.FC<SurveyProps> = ({ question, onYes, onNo }) => {
  const [answered, setAnswered] = useState(false);

  const handleYes = () => {
    setAnswered(true);
    onYes();
  };

  const handleNo = () => {
    setAnswered(true);
    onNo();
  };

  return (
    <View style={styles.container}>
      {answered ? (
        <Text style={styles.thankYouText}>Thank you for your response!</Text>
      ) : (
        <>
          <Text style={styles.questionText}>{question}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonYes} onPress={handleYes}>
              <Text style={styles.buttonTextYes}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNo} onPress={handleNo}>
              <Text style={styles.buttonTextNo}>No</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9, // 80% of the screen width
    padding: 20,
    backgroundColor: '#FFFFFF', // Changed to white for better contrast
    borderRadius: 20, // Reduced borderRadius for a less pill-shaped card
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center', // Center the card horizontally
    elevation: 5, // Increased elevation for a more prominent shadow
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 3.84, // iOS shadow radius
  },
  questionText: {
    fontSize: 18, // Increased font size for better readability
    color: Colors.light.headingTitle,
    marginBottom: 20, // Increased margin for better spacing
    textAlign: 'center',
    fontFamily: fonts.primary.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonYes: {
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, // Pill-shaped button
    marginRight: 15, // Space between the "Yes" and "No" buttons
    borderWidth: 1,
    borderColor: Colors.light.primaryBtn,
  },
  buttonNo: {
    backgroundColor: Colors.light.background, // Light background for "No" button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, // Pill-shaped button
    borderWidth: 1,
    borderColor: 'red', // Red border to match the text color
  },
  buttonTextYes: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
    textDecorationLine: 'underline', // Underline the "Yes" text
  },
  buttonTextNo: {
    color: 'red',
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
    textDecorationLine: 'underline', // Underline the "No" text
  },
  thankYouText: {
    fontSize: 18,
    color: Colors.light.serialNoGreen, // Ensure this color contrasts well with the background
    textAlign: 'center',
    fontFamily: fonts.primary.regular,
  },
});

export default Survey;
