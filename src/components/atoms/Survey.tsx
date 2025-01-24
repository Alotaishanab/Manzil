// src/components/Survey.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
// If you have your own color/fonts, adjust accordingly:
import { Colors } from '../../constants/Colors';
import { fonts } from '../../assets/fonts';

interface SurveyProps {
  question: string;
  onYes: () => void;
  onNo: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Survey: React.FC<SurveyProps> = ({ question, onYes, onNo }) => {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  const handleYes = () => {
    setAnswer('yes');
    onYes();
  };

  const handleNo = () => {
    setAnswer('no');
    onNo();
  };

  const answered = answer !== null;
  let thankYouMessage = 'Thank you for your response!';
  if (answer === 'yes') {
    thankYouMessage = 'Thanks for your interest!';
  } else if (answer === 'no') {
    thankYouMessage = 'Thanks for letting us know!';
  }

  return (
    <View style={styles.container}>
      {answered ? (
        <Text style={styles.thankYouText}>{thankYouMessage}</Text>
      ) : (
        <>
          <Text style={styles.questionText}>{question}</Text>
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
    // Make overall height smaller for a less “fat” card
    height: screenHeight * 0.12,
    width: screenWidth * 0.93,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // Glassmorphic style
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    // Light border to enhance the glass look
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // Drop shadow
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 16,
    color: Colors.light.headingTitleDark || 'black',
    fontFamily: fonts.primary.regular,
    marginBottom: 8,
    textAlign: 'center',
  },
  arrowUp: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // Slightly more solid color to make the triangle visible
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
  },
  buttonYes: {
    flex: 1,
    backgroundColor: 'rgba(34,139,34,0.7)', // A translucent green
    paddingVertical: 6,
    marginRight: 5,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34,139,34,0.9)',
  },
  buttonNo: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 6,
    marginLeft: 5,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  buttonTextYes: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
  buttonTextNo: {
    color: '#333',
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
  thankYouText: {
    fontSize: 16,
    color: 'rgba(34,139,34,0.9)',
    fontFamily: fonts.primary.medium,
    textAlign: 'center',
  },
});

export default Survey;
