import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';
// import {globalStyles} from '../../../src/styles/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const styles = StyleSheet.create({

  
  imageBgStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  imageStyle: {
    flex: 1,
    // height: 350,
    width: '95%',
    alignSelf: 'center',
  },
  favoriteBtn: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 25,
  },
  favoriteBtnText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
  },
  mapLayerBtn: {
    backgroundColor: Colors.light.primary, // Your button style
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
  },
  filterButton: {
    backgroundColor: Colors.light.primary, // Adjust to match your FilterHeader
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // This will place it right under the filter header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  filterButtonText: {
    color: Colors.light.text, // Adjust to match your text style
    fontSize: 16,
    fontFamily: 'YourFont', // Replace with your font for consistency
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  flex1: {
    flex: 1,
  },
  maximizeScreenBtn: {
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 2,
    height: 40,
    width: 40,
    top: 10,
    alignSelf: 'flex-end',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  drawSketchText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    marginLeft: 5,
  },
  // Modify the style
drawYourSearchAreaView: {
  position: 'absolute',
  alignSelf: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  padding: 8,
  borderRadius: 5,
  zIndex: 1,
},

  drawSearchText: {
    overflow: 'visible',
    fontFamily: fonts.secondary.regular,
    fontSize: 12,
    color: Colors.light.offWhite,
    textAlign: 'center',
    zIndex: 1000,
  },
  drawSketchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: Colors.light.background,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '45%',
  },
  searchBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: Colors.light.primaryBtn,
    width: '45%',
  },
  searchBtnText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    // marginLeft: 5,
  },
  dayBtn: {
    backgroundColor: '#625440',
    paddingHorizontal: 15,
    // paddingVertical: 6,
    height: 30,
    justifyContent: 'center',
    borderRadius: 20,
  },
});
