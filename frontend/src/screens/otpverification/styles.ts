import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: fonts.primary.regular,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.light.black,
  },
});
