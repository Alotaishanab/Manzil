import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts/index';

export const styles = StyleSheet.create({
  screenWrap: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
  },
  innerWrap: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: Colors.light.background,
  },
  inputTitleStyle: {
    fontSize: 13,
    fontFamily: fonts.primary.semiBold,
    color: Colors.light.headingTitle,
  },
  forgotPasswordText: {
    fontFamily: fonts.primary.medium,
    fontSize: 13,
    color: Colors.light.headingTitle,
  },
  orText: {
    color: Colors.light.orText,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    alignSelf: 'center',
  },
});
