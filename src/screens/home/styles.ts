import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  headingText: {
    color: Colors.light.grey,
    fontFamily: fonts.primary.semiBold,
    fontSize: 12,
  },
  localExpertText: {
    color: Colors.light.headingTitle,
    fontSize: 12,
    fontFamily: fonts.primary.regular,
  },
  findOutMoreMainWrap: {
    backgroundColor: Colors.light.findOutBg,
    // paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    height: 180,
    paddingLeft: 10,
    // paddingHorizontal: 20,
    borderRadius: 4,
  },
  findOutMoreMainTitle: {
    color: Colors.light.background,
    fontSize: 20,
    opacity: 0.6,
    fontFamily: fonts.primary.regular,
  },
  findOutMoreBtn: {
    backgroundColor: Colors.light.findOutBtn,
    paddingVertical: 7,
    borderWidth: 0.5,
    width: '68%',
    alignItems: 'center',
    borderColor: Colors.light.background,
    paddingHorizontal: 10,
  },
  findOutMoreText: {
    color: Colors.light.background,
    fontSize: 13,
    opacity: 0.7,
    fontFamily: fonts.primary.regular,
  },
});
