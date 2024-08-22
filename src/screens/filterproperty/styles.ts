import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  titleText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 15,
  },
  bedroomBathroomContent: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    // height: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: width,
    marginVertical: 10,
    borderTopColor: Colors.light.greyDescription,
    borderBottomColor: Colors.light.greyDescription,
    paddingVertical: 10,
  },
});
