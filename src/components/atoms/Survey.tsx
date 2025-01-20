// src/components/Survey.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import { fonts } from '../../assets/fonts';
import { Screen } from 'react-native-screens';

interface SurveyProps {
  question: string;
  onYes: () => void;
  onNo: () => void;
}

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

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
          {/* Arrow pointing up added above the button container */}
          <View style={styles.arrowUp} />
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
    width: screenWidth * 0.9, // 90% of the screen width
    height: screenHeight * 0.15,
    padding: 20,
    backgroundColor: '#FFFFFF', // White background for better contrast
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  questionText: {
    fontSize: 18,
    color: Colors.light.headingTitle,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: fonts.primary.regular,
  },
  // Arrow pointing up style
  arrowUp: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.light.primaryBtn,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  // Make buttons thin and wide
  buttonYes: {
    flex: 1,
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 6,
    marginRight: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.light.primaryBtn,
    alignItems: 'center',
  },
  buttonNo: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingVertical: 6,
    marginLeft: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
  },
  buttonTextYes: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    textDecorationLine: 'underline',
  },
  buttonTextNo: {
    color: 'red',
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    textDecorationLine: 'underline',
  },
  thankYouText: {
    fontSize: 18,
    color: Colors.light.serialNoGreen,
    textAlign: 'center',
    fontFamily: fonts.primary.regular,
  },
});

export default Survey;
