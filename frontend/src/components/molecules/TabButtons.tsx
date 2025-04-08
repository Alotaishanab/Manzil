/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Colors} from '@colors';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../assets/fonts';
import {globalStyles} from '../../styles/globalStyles';

type TabButtonProps = {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  borderRadius?: number;
  paddingVertical?: any;
};
export const TabButtons: React.FC<TabButtonProps> = ({
  options,
  selectedOption,
  onSelect,
  borderRadius = 20,
  paddingVertical = 7,
}) => {
  return (
    <View style={globalStyles.simpleRow}>
      {options?.map((option, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSelect(option)}
            style={[
              styles.btnStyle,
              {
                paddingVertical: paddingVertical,
                borderRadius: borderRadius,
                marginLeft: index === 0 ? 0 : 5,
                backgroundColor:
                  selectedOption === option
                    ? Colors.light.primaryBtn
                    : Colors.light.secondaryBackground,
              },
            ]}>
            <Text
              style={[
                styles.textStyle,
                {
                  color:
                    selectedOption === option
                      ? Colors.light.background
                      : Colors.light.headingTitle,
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

export default TabButtons;

const styles = StyleSheet.create({
  btnStyle: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 13,
  },
  textStyle: {
    fontSize: 12,
    fontFamily: fonts.primary.semiBold,
  },
});
