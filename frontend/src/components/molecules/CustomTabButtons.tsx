import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {fonts} from '../../../src/assets/fonts';
import {Colors} from '@colors';

type TabButtonProps = {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  selectedBtnColor?: string;
  unselectedBtnColor?: string;
};

export const CustomTabButtons: React.FC<TabButtonProps> = ({
  options,
  selectedOption,
  onSelect,
  selectedBtnColor = Colors.light.unselectBtn,
  unselectedBtnColor = Colors.light.background,
}) => {
  console.log('options', options);
  return (
    <View style={styles.mainWrap}>
      {options?.map(option => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={option}
            onPress={() => onSelect(option)}
            style={[
              styles.btnStyle,
              {
                backgroundColor:
                  selectedOption === option
                    ? selectedBtnColor
                    : unselectedBtnColor,
              },
            ]}>
            <Text
              style={[
                styles.btnTextStyle,
                {
                  fontFamily:
                    selectedOption === option
                      ? fonts.primary.medium
                      : fonts.primary.regular,
                },
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnStyle: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  btnTextStyle: {
    fontSize: 12,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
});
