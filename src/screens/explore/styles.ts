import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {width} from '../../hooks/useDimension';
import {fonts} from '../../../src/assets/fonts';

export const styles = StyleSheet.create({
  filterSquareBtn: {
    borderWidth: 1.5,
    borderRadius: 17,
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
  },
  firstFlatListContentContainerStyle: {
    paddingHorizontal: 2,
    marginBottom: 4,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Colors.light.background,
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
  bottomWrap: {
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f7f7f7',
  },
  topAgencyWrap: {
    backgroundColor: Colors.light.greyBg,
    borderRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 10,
    marginHorizontal: 0,
  },
  topAgencyText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.mediumItalic,
    fontSize: 20,
  },
  sellAll: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 13,
  },
  agencyBtn: {
    width: 100,
    height: 150,
    // backgroundColor: 'red',
    borderRadius: 10,
    marginRight: 10,
    // marginBottom: 1,
  },
  agencyImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
