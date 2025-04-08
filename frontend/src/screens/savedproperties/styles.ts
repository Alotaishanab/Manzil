import { StyleSheet } from 'react-native';
import { Colors } from '@colors';
import { fonts } from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.light.background, // Changed from 'color' to 'backgroundColor'
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
  refreshContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  refreshAnimation: {
    width: 50,
    height: 50,
  },
});
