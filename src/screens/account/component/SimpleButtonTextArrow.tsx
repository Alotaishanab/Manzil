import React from 'react';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';
import {ChevronForwardIcon} from '@svgs';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ButtonType = {
  title: string;
  handleClick: () => void;
};

const SimpleButtonTextArrow = ({title, handleClick = () => {}}: ButtonType) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleClick}
      style={styles.btnWrap}>
      <Text style={styles.btnText}>{title}</Text>
      <ChevronForwardIcon width={30} height={30} />
    </TouchableOpacity>
  );
};

export default SimpleButtonTextArrow;

const styles = StyleSheet.create({
  btnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 13,
    justifyContent: 'space-between',
  },
  btnText: {
    fontSize: 14,
    color: Colors.light.arrowBtnText,
    fontFamily: fonts.primary.regular,
  },
});
