import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    color: Colors.light.background,
  },
  headerView: {
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.light.background,
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
});
