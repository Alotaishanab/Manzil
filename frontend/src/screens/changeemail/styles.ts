import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {width} from '../../hooks/useDimension';
import {fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  descriptionText: {
    color: Colors.light.headingTitle,
    fontSize: 13,
    fontFamily: fonts.primary.regular,
  },
  fieldTitle: {
    color: Colors.light.greyHeading,
    fontSize: 13,
    fontFamily: fonts.primary.regular,
  },
  emailText: {
    color: Colors.light.headingTitle,
    fontSize: 13,
    textDecorationLine: 'underline',
    fontFamily: fonts.primary.medium,
  },
  fieldTitleText: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
});
