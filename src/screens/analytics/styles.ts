import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';

export const styles = StyleSheet.create({
  mainTitle: {
    color: Colors.light.thinDark,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  userLocationText: {
    color: Colors.light.greyHeading,
    fontSize: 15,
    marginLeft: 7,
    fontFamily: fonts.primary.regular,
  },
  imageMapPiece: {
    width: 100,
    height: 100,
  },
  locationText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
  locationNamePercentage: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: Colors.light.increaseArrow,
  },
});
