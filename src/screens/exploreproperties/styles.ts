import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';
import {width} from '../../hooks/useDimension';

export const styles = StyleSheet.create({
  screenWrap: {
    flexShrink: 1,
    backgroundColor: Colors.light.secondaryBackground,
  },
  mainWrap: {
    flexGrow: 1,
    backgroundColor: Colors.light.secondaryBackground,
    paddingBottom: 20,
  },
  imageStyle: {
    height: 300,
    width: '100%',
  },
  imageBgStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 300,
    width: '100%',
  },
  imageCountWrapper: {
    margin: 15,
    backgroundColor: Colors.light.background,
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCountText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    marginLeft: 10,
    fontSize: 15,
  },
  priceDetailContentView: {
    backgroundColor: Colors.light.background,
    borderRadius: 40,

    padding: 10,
  },
  serialNoText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 24,
    lineHeight: 27,
  },
  shareLikeWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  guidePriceTitle: {
    fontFamily: fonts.primary.regular,
    color: Colors.light.grey,
  },
  addressText: {
    fontSize: 14,
    color: Colors.light.dark,
    fontFamily: fonts.primary.regular,
  },
  reducedDate: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
  headingText: {
    color: Colors.light.headingTitle,
    fontSize: 15,
    fontFamily: fonts.primary.medium,
    marginLeft: 5,
  },
  distanceText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 13,
    marginLeft: 10,
  },
  contactsText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
  },
  modalInnerWrap: {
    // height: 300,
    width: width,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapLayerBtn: {
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 8,
    right: 10,
    position: 'absolute',
    top: 80,
    alignSelf: 'flex-end',
  },
  propertiesFeatues: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.secondary.bold,
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
  },
  featuredPropertyCard: {
    height: 100,
    width: 100,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginBottom: 5,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featuredPropertyCardText: {
    fontFamily: fonts.primary.regular,
    fontSize: 13,
    color: Colors.light.headingTitle,
    textAlign: 'center',
  },
  description: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    marginVertical: 5,
  },
  savisWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.yellow,
    opacity: 0.8,
    borderRadius: 10,
    height: 100,
    marginHorizontal: 20,
  },
  savisText: {
    color: Colors.light.danger,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
  },
  roundedWrap: {
    backgroundColor: Colors.light.background,
    borderRadius: 40,
    padding: 15,
    paddingTop: 15,
    width: width,
  },
});
