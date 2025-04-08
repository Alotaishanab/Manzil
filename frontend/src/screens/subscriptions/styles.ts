import {Colors} from '@colors';
import {fonts} from '@fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerWrap: {
    backgroundColor: Colors.light.unselectBtn,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headingTitle: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: Colors.light.headingTitle,
  },
  rowTitle: {
    marginLeft: 10,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  warningMsg: {
    color: Colors.light.thinBlack,
    fontFamily: fonts.primary.regular,
    fontSize: 13,
    width: '89%',
    // flexWrap: 'wrap',
  },
  planTitle: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
  },
  termsOfUseBlueText: {
    color: Colors.light.darkBlue,
    fontFamily: fonts.primary.semiBold,
    fontSize: 14,
  },

  planDescription: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 13,
  },
  planCheckConditions: {
    color: Colors.light.grey,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
  },
});
