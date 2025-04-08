import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';
import {width} from '../../hooks/useDimension';

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.light.black,
  },
  description: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: Colors.light.black,
  },
  inputTitleStyle: {
    fontSize: 13,
    fontFamily: fonts.primary.semiBold,
    color: Colors.light.headingTitle,
  },
  backLoginBtn: {
    position: 'absolute',
    bottom: 50,
    width: 150,
    left: width / 2 - 50,
    right: width / 2 - 60,
  },
  backLoginBtnText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.medium,
    fontSize: 13,
  },
});
