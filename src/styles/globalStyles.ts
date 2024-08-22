import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../assets/fonts/index';

export const globalStyles = StyleSheet.create({
  wrapScreen: {backgroundColor: Colors.light.background, flex: 1, padding: 24},
  wrap: {backgroundColor: Colors.light.background, flex: 1},
  centeredBtn: {
    alignSelf: 'center',
  },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  rowSpaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputTitleStyle: {
    fontSize: 13,
    fontFamily: fonts.primary.semiBold,
    color: Colors.light.headingTitle,
  },
  orText: {
    color: Colors.light.orText,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    alignSelf: 'center',
  },
  addBtn: {
    backgroundColor: Colors.light.primaryBtn,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    zIndex: 500,
    position: 'absolute',
    bottom: 10,
    width: 50,
    borderRadius: 50,
  },
  orLine: {
    flex: 1,
    borderColor: Colors.light.orLine,
    borderWidth: 0.5,
  },
  orLineText: {
    marginHorizontal: 10,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  socialBtn: {
    backgroundColor: Colors.light.background,
    borderRadius: 30,
    paddingVertical: 13,
    alignItems: 'center',
    height: 52,
    shadowColor: '#000',
    paddingHorizontal: 20,
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    margin: 5,
  },
  socialBtnText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
  },
  propertTypeCard: {
    // borderWidth: 1,
    width: 105,
    height: 105,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.propertyCardLine,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // elevation: 3,
  },
  propertyTypeCardText: {
    top: 3,
    fontFamily: fonts.primary.medium,
    fontSize: 10,
    color: Colors.light.headingTitle,
  },
});
