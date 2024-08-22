/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Colors} from '@colors';
import Share from 'react-native-share';
import {TopSpace} from '@components';
import {AreaIcon, BathroomIcon, BedIcon, FavoriteIcon, ShareIcon} from '@svgs';
import {useIntl} from '@context';
import {building} from '@assets';
import {globalStyles} from '@globalStyles';
import {fonts} from '@fonts';

const ListedPropertyCard = ({item, handleClick = () => {}}) => {
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
          borderRadius: 10,
        }}
        style={styles.imageBgStyle}>
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

        {item?.featured && (
          <View style={styles.featuredPropertyView}>
            <Text style={styles.featuredPropertyText}>
              {intl
                .formatMessage({
                  id: 'listedPropertyScreen.featured-property',
                })
                ?.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

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
            <BedIcon width={32} height={32} />
            <Text style={styles.countText}>2</Text>
          </View>

          <View
            style={[
              globalStyles.simpleRow,
              {
                marginRight: 20,
              },
            ]}>
            <AreaIcon width={32} height={32} />
            <Text style={styles.countText}>819 sq ft</Text>
          </View>

          <View style={globalStyles.simpleRow}>
            <BathroomIcon width={32} height={32} />
            <Text style={styles.countText}>2</Text>
          </View>
        </View>
      </View>

      <TopSpace top={15} />
      <View style={styles.footerWrap}>
        <Text style={styles.dateText}>
          {/* explore.added-on */}
          {intl.formatMessage({
            id: 'explore.added-on',
          })}{' '}
          09/05/2024
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={handleShare}>
          <ShareIcon width={32} height={32} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ListedPropertyCard;

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
  },
  featuredPropertyView: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: Colors.light.primaryBtn,
  },
  featuredPropertyText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.regular,
    fontSize: 13,
  },
  imageBgStyle: {
    height: 270,
    alignItems: 'flex-end',
    padding: 5,
  },
  placeText: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
  serialNoText: {
    marginLeft: 10,
    color: Colors.light.serialNoGreen,
    fontSize: 24,
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
    color: Colors.light.grey,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
});
