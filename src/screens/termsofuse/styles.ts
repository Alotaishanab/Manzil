import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
  },
  description: {
    fontSize: 13,
    color: Colors.light.grey,
    fontFamily: fonts.primary.regular,
  },
});
