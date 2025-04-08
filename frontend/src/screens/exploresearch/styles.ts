import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  currentLocationView: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.light.secondaryBackground,
    borderBottomColor: Colors.light.secondaryBackground,
    alignItems: 'center',
  },
  currentLocationText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    marginLeft: 10,
  },
  headingTitleStyle: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 12,
  },
});
