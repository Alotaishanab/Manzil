/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Colors} from '@colors';
import Share from 'react-native-share';
import {TopSpace} from '@components';
import {AreaIcon, BathroomIcon, BedIcon, ShareIcon} from '@svgs';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';
import {fonts} from '@fonts';
import PromoteImageCarousel from './PromoteImageCorousel';

const PromoteCard = ({handleClick = () => {}}) => {
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

  const images = [
    {uri: 'https://picsum.photos/200/300', id: 1},
    {uri: 'https://picsum.photos/200/301', id: 2},
    {uri: 'https://picsum.photos/200/302', id: 3},
    {uri: 'https://picsum.photos/200/302', id: 4},
  ];

  return (
    <View
      // activeOpacity={0.8}
      // onPress={handleClick}
      style={styles.mainWrapper}>
      <PromoteImageCarousel images={images} />
      <TouchableOpacity activeOpacity={0.8} onPress={handleClick}>
        <TopSpace top={10} />
        <Text style={styles.serialNoText}>
          {intl.formatMessage({
            id: 'explore.serial',
          })}{' '}
          799,997
        </Text>
        <TopSpace top={10} />
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
        <View style={styles.footerWrap}>
          <Text style={styles.dateText}>
            {intl.formatMessage({
              id: 'explore.added-on',
            })}{' '}
            09/05/2024
          </Text>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            activeOpacity={0.8}
            onPress={handleShare}>
            <ShareIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PromoteCard;

export const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 15,
    paddingBottom: 10,
    // borderBottomLeftRadius: 5,
    borderRadius: 10,
    // borderBottomRightRadius: 5,
    shadowColor: '#000',
    backgroundColor: Colors.light.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 2,
  },
  imageBgStyle: {
    height: 270,
    alignItems: 'flex-end',
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
    fontFamily: fonts.primary.mediumItalic,
  },
  descriptionText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
  },
  countText: {
    marginLeft: 5,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
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
});
