import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    // textAlign: 'center',
    color: Colors.light.grey,
  },
  timerText: {
    textAlign: 'center',
    fontFamily: fonts.primary.bold,
    color: Colors.light.primaryBtn,
    fontSize: 32,
  },
});
