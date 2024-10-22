import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { fonts } from '../../assets/fonts';

interface SurveyProps {
  question: string;
  onYes: () => void;
  onNo: () => void;
}

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
              <Text style={styles.buttonText}>Yes</Text>
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
    padding: 10,
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
  },
  questionText: {
    fontSize: 16,
    color: Colors.light.headingTitle,
    marginBottom: 15,
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
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginRight: 30, // Space between the "Yes" and "No" buttons
  },
  buttonNo: {
    backgroundColor: '#F5F5F5', // Light grey background for "No" button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },
  buttonTextNo: {
    color: 'red', // Red text color to match the example
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },
  thankYouText: {
    fontSize: 16,
    color: Colors.light.serialNoGreen, // Use a green color for the thank you message
    textAlign: 'center',
    fontFamily: fonts.primary.regular,
  },
});

export default Survey;
