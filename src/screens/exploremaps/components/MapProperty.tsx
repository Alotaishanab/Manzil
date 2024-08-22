/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {fonts} from '../../../../src/assets/fonts';
import {Colors} from '@colors';
import Share from 'react-native-share';
import {TopSpace} from '@components';
import {AreaIcon, BathroomIcon, BedIcon, FavoriteIcon, ShareIcon} from '@svgs';
import {useIntl} from '@context';
import {building} from '@assets';

const MapProperty = ({handleClick = () => {}}) => {
  const {intl} = useIntl();
  const options = {
    title: 'Here is title',
  };
  const handleShare = () => {
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleClick}
      style={styles.mainWrapper}>
      <ImageBackground
        source={building}
        imageStyle={{
          // borderRadius: 10,
          borderRadius: 25,
        }}
        style={styles.imageBgStyle}>
        <View style={styles.dayBtn}>
          <Text style={styles.dayBtnText}>290 days on Zillow</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <FavoriteIcon
            // fill={Colors.light.primaryButton}
            width={30}
            height={30}
          />
        </TouchableOpacity>
      </ImageBackground>
      <TopSpace top={10} />
      <View style={globalStyles.rowSpaceBetween}>
        <Text style={styles.serialNoText}>
          {intl.formatMessage({
            id: 'explore.serial',
          })}{' '}
          799,997
        </Text>
      </View>

      <View style={{marginHorizontal: 8}}>
        <Text style={styles.descriptionText}>
          {intl.formatMessage({
            id: 'explore.2-bed-flat-rent',
          })}
        </Text>
        <TopSpace top={3} />
        <Text style={styles.placeText}>
          {intl.formatMessage({
            id: 'explore.riyadh-saudia',
          })}
        </Text>
        <TopSpace top={15} />
        <View style={globalStyles.simpleRow}>
          <View
            style={[
              globalStyles.simpleRow,
              {
                marginRight: 20,
              },
            ]}>
            <BedIcon width={25} height={25} />
            <Text style={styles.countText}>2</Text>
          </View>

          <View
            style={[
              globalStyles.simpleRow,
              {
                marginRight: 20,
              },
            ]}>
            <AreaIcon width={25} height={25} />
            <Text style={styles.countText}>819 sq ft</Text>
          </View>

          <View style={globalStyles.simpleRow}>
            <BathroomIcon width={25} height={25} />
            <Text style={styles.countText}>2</Text>
          </View>
        </View>
      </View>

      <TopSpace top={15} />
    </TouchableOpacity>
  );
};

export default MapProperty;

export const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 15,
    paddingBottom: 10,
    // borderBottomLeftRadius: 5,
    borderRadius: 25,
    // borderBottomRightRadius: 5,
    shadowColor: '#000',
    backgroundColor: Colors.light.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBgStyle: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
    padding: 5,
  },
  placeText: {
    color: Colors.light.serialNoGreen,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
  serialNoText: {
    marginLeft: 10,
    color: Colors.light.headingTitle,
    fontSize: 20,
    fontFamily: fonts.primary.regular,
  },
  descriptionText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  countText: {
    marginLeft: 5,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  footerWrap: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  footerLeftView: {
    flex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerRightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateText: {
    color: Colors.light.serialNoGreen,
    fontFamily: fonts.primary.regular,
    fontSize: 11,
  },
  dayBtn: {
    backgroundColor: '#625440',
    paddingHorizontal: 15,
    // paddingVertical: 6,
    height: 30,
    justifyContent: 'center',
    borderRadius: 20,
  },
  dayBtnText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
  },
});
