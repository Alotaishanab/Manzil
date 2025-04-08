import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  topWrap: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colors.light.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    padding: 24,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  continueGuestText: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    marginRight: 10,
    fontFamily: fonts.primary.medium,
  },
  imgView: {
    width: 360,
    height: 360,
    borderRadius: 20,
    alignSelf: 'center',
  },
  logoImgStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  titleText: {
    width: '70%',
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 35,
    color: Colors.light.headingTitle,
    fontSize: 20,
    fontFamily: fonts.primary.bold,
  },
  descriptionText: {
    color: Colors.light.description,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    lineHeight: 24,
  },
  shadowBtn: {
    backgroundColor: Colors.light.background,
    borderRadius: 30,
    paddingVertical: 13,
    alignItems: 'center',
    // borderWidth: 1,
    height: 52,
    shadowColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    margin: 5,
  },
  sheetLine: {
    width: 35,
    height: 5,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.light.sheetLine,
  },
  shadowBtnText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
  },
  orLine: {
    flex: 1,
    borderColor: Colors.light.orLine,
    borderWidth: 0.5,
  },
});
