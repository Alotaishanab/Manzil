/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {globalStyles} from '../../styles/globalStyles';
import {fonts} from '../../../src/assets/fonts';
import {Colors} from '@colors';
import Share from 'react-native-share';
import {TopSpace} from '@components';
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  FavoriteIcon,
  GalleryIcon,
  HeartIcon,
  ShareIcon,
} from '@svgs';
import {useIntl} from '@context';
import {width} from '@useDimension';

export const PropertyCard = ({item, handleClick = () => {}}) => {
  const {intl} = useIntl();
  const [currentIndex, setCurrentIndex] = React.useState(0); // state to track the current index
  const images = [
    {uri: 'https://picsum.photos/200/300', id: 1},
    {uri: 'https://picsum.photos/200/301', id: 2},
    {uri: 'https://picsum.photos/200/302', id: 3},
    {uri: 'https://picsum.photos/200/303', id: 4},
  ];
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
    <View style={styles.mainWrapper}>
      <View>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          loop={false}
          // width={width}
          height={300}
          index={currentIndex}
          onIndexChanged={index => setCurrentIndex(index)} // update index on change
          paginationStyle={styles.pagination}
          renderPagination={(index, total) => (
            <View style={styles.pagination}>
              <GalleryIcon width={18} height={18} />
              <Text style={styles.paginationText}>
                {images?.length > 0 ? index + 1 : 0}
                {images?.length === 0 ? `/${total - 1}` : `/${total}`}
              </Text>
            </View>
          )}>
          {images?.map((image, index) => (
            <View key={index} style={styles.slide}>
              <ImageBackground
                resizeMode="cover"
                source={{uri: image.uri}}
                imageStyle={{borderRadius: 30}}
                style={styles.imageBgStyle}>
                <TouchableOpacity
                  style={{margin: 12, marginRight: 30, alignSelf: 'flex-end'}}>
                  <HeartIcon width={30} height={30} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ))}
        </Swiper>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={handleClick}>
        <TopSpace top={10} />
        <Text style={styles.serialNoText}>
          {intl.formatMessage({
            id: 'explore.serial',
          })}{' '}
          799,997
        </Text>
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
          <TouchableOpacity activeOpacity={0.8} onPress={handleShare}>
            <ShareIcon width={32} height={32} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  mainWrapper: {
    paddingBottom: 10,
    borderRadius: 25,
    shadowColor: '#000',
    backgroundColor: Colors.light.background,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
    marginBottom: 3,
    width: '100%',
  },
  wrapper: {
    // zIndex: 1000, overflow: 'visible'
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // marginRight: 5,
    height: 300,
    borderRadius: 25,

    // height: 300, // Set the height of the slider
  },
  pagination: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 40,
    width: '25%',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  paginationText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    marginLeft: 10,
    fontSize: 12,
  },
  imageBgStyle: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    height: '100%', // Match the height of the slider
    // alignItems: 'flex-end',
    // padding: 15,
  },
  placeText: {
    color: Colors.light.serialNoGreen,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
  serialNoText: {
    marginLeft: 20,
    color: Colors.light.headingTitle,
    fontSize: 22,
    fontFamily: fonts.primary.regular,
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
    fontSize: 14,
  },
  footerWrap: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  dateText: {
    color: Colors.light.serialNoGreen,
    fontFamily: fonts.primary.regular,
    fontSize: 11,
  },
});
