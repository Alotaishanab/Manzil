import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@colors';
import { fonts } from '@fonts';

export const CustomCheckbox = ({ title, selectedOption, onValueChange }: any) => {
  const isSelected = selectedOption === title;
  const isYes = title.trim().toLowerCase() === 'yes';
  const isNo = title.trim().toLowerCase() === 'no';

  // Determine styles based on the option and whether it's selected.
  let buttonStyle = [styles.button];
  let textStyle = [styles.buttonText];

  if (isYes) {
    if (isSelected) {
      buttonStyle.push(styles.yesSelected);
      textStyle.push(styles.yesTextSelected);
    } else {
      buttonStyle.push(styles.yesUnselected);
      textStyle.push(styles.yesTextUnselected);
    }
  } else if (isNo) {
    if (isSelected) {
      buttonStyle.push(styles.noSelected);
      textStyle.push(styles.noTextSelected);
    } else {
      buttonStyle.push(styles.noUnselected);
      textStyle.push(styles.noTextUnselected);
    }
  } else {
    // Fallback if needed.
    if (isSelected) {
      buttonStyle.push(styles.buttonSelected);
      textStyle.push(styles.textSelected);
    } else {
      buttonStyle.push(styles.buttonUnselected);
      textStyle.push(styles.textUnselected);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => onValueChange(title)}
      activeOpacity={0.8}
      style={buttonStyle}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, // Uniform size for both "Yes" and "No"
    height: 35,
    borderRadius: 30,
    borderWidth: 0.5,
    marginHorizontal: 5,
  },
  // Styles for the "Yes" option
  yesSelected: {
    backgroundColor: Colors.light.primaryBtn, // Green when selected
    borderColor: '#34C759',
  },
  yesUnselected: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  yesTextSelected: {
    color: '#fff',
    fontFamily: fonts.primary.medium,
  },
  yesTextUnselected: {
    color: '#34C759',
  },
  // Styles for the "No" option
  noSelected: {
    backgroundColor: '#FF3B30', // Refined red when selected
    borderColor: '#FF3B30',
  },
  noUnselected: {
    backgroundColor: '#F2F2F2', // Light grey when unselected
    borderColor: '#ccc',
  },
  noTextSelected: {
    color: '#fff',
    fontFamily: fonts.primary.medium,
  },
  noTextUnselected: {
    color: '#FF3B30',
  },
  // Fallback styles (if needed for other options)
  buttonSelected: {
    backgroundColor: Colors.light.primaryBtn,
    borderColor: Colors.light.primaryBtn,
  },
  buttonUnselected: {
    backgroundColor: '#fff',
    borderColor: Colors.light.headingTitle,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },
  textSelected: {
    color: '#fff',
    fontFamily: fonts.primary.medium,
  },
  textUnselected: {
    color: Colors.light.headingTitle,
  },
});
