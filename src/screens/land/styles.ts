import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {width} from '../../hooks/useDimension';
import {fonts} from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  footer: {
    height: 120,
  },
  mapBtn: {
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 10,
    width: width / 3.1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  mapBtnText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    marginRight: 10,
  },
});
