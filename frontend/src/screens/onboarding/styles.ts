import {StyleSheet, Platform} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';
import {height} from '../../hooks/useDimension';

export const styles = StyleSheet.create({
  skipBtn: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 30,
  },
  skipBtnText: {
    color: Colors.light.background,
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  bottomWrap: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    // height: 300,
  },
  onboardingTitle: {
    fontSize: 18,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
  },
  onboardingDescription: {
    fontSize: 14,
    color: Colors.light.lightBlack,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  inactiveDot: {
    backgroundColor: Colors.light.grey,
    borderRadius: 12.24,
    width: 7.24,
    height: 7.24,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.light.activeDot,
    borderRadius: 12.24,
    width: 28.24,
    height: 7.24,
    marginHorizontal: 4,
  },
  swiperStyle: {
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
  },
  paginationStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: height / 3.5,
  },
  paginationContainerStyle: {
    flexGrow: 1,
  },
});
