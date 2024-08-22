import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts/index';

export const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    fontWeight: '500',
  },
  needVerifyText: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.light.grey,
    fontWeight: '400',
  },
  chooseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    height: 90,
    flex: 1,
    justifyContent: 'center',
  },
  buttonChooseText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    marginLeft: 15,
    // lineHeight: 30,
    color: Colors.light.headingTitle,
    fontWeight: '600',
  },
  forgotPasswordText: {
    fontFamily: fonts.primary.medium,
    fontSize: 13,
    color: Colors.light.headingTitle,
  },
});
