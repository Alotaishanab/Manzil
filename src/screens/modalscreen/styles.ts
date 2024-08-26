import {StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';
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
  priceDetailContentView: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    padding: 10,
  },
  serialNoText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 22,
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
    color: Colors.light.headingTitle,
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapLayerBtn: {
    backgroundColor: Colors.light.background,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    borderRadius: 8,
    right: 10,
    position: 'absolute',
    top: 80,
    alignSelf: 'flex-end',
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
    borderRadius: 10,
    padding: 10,
    width: width,
  },
  propertiesFeatues: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
});
