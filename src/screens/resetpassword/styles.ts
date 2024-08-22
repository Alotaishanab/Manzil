import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: fonts.primary.bold,
    fontSize: 18,
    // textAlign: 'center',
    color: Colors.light.black,
  },
  titleText: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: Colors.light.black,
  },
});
