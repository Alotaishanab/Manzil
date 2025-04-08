import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from '../styles';
import * as SVGs from '../../../assets/svgs';
import {Colors} from '@colors';
import {fonts} from '../../../assets/fonts';

const ChooseVerificationMethod = ({
  handleCategory,
  selectedCategory,
  marginLeft,
  icon,
  text,
}: any) => {
  const Icon = SVGs[icon];

  return (
    <TouchableOpacity
      onPress={() => handleCategory(text)}
      style={[
        styles.chooseBtn,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          borderWidth: selectedCategory === text ? 1 : 0,
          marginLeft: marginLeft,
          borderColor:
            selectedCategory === text
              ? Colors.light.grey
              : Colors.light.inputBg,
        },
      ]}>
      <Icon width={25} height={25} />
      <Text
        style={[
          styles.buttonChooseText,
          {
            fontFamily:
              selectedCategory === text
                ? fonts.primary.medium
                : fonts.primary.regular,
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ChooseVerificationMethod;
