/* eslint-disable react-native/no-inline-styles */
import {Colors} from '@colors';
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {FavoriteIcon, GalleryIcon} from '@svgs';
import {fonts} from '@fonts';

const PromoteImageCarousel = ({images = []}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0); // state to track the current index

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={false}
      scrollEnabled={true}
      // width={'100%'}
      pagingEnabled={true}
      autoplay={false}
      index={currentIndex}
      onIndexChanged={index => {
        if (index < images?.length) {
          setCurrentIndex(index);
        }
      }}
      paginationStyle={[
        styles.pagination,
        {
          // justifyContent: 'center',
          // alignItems: 'center',
        },
      ]}
      renderPagination={(index, total) => {
        const current = Math.min(index + 1, images.length);
        const totalSlides = images.length;

        return (
          <View style={[styles.pagination, {}]}>
            <GalleryIcon width={18} height={18} />
            <Text style={styles.paginationText}>
              {current}/{totalSlides}
              {/* {images?.length > 0 ? index + 1 : 0}
                {images?.length > 0 ? `/${total - 1}` : `/${total}`} */}
            </Text>
          </View>
        );
      }}
      //
    >
      {images?.map((image: {uri: any}, index: React.Key | null | undefined) => (
        <View
          key={index}
          style={[
            styles.slide,
            {
              height: 250,
            },
          ]}>
          <ImageBackground
            resizeMode="cover"
            imageStyle={{
              borderRadius: 10,
            }}
            source={{uri: image.uri}}
            style={styles.imageBgStyle}>
            <TouchableOpacity
              onPress={() => Alert.alert('s')}
              style={{top: 10, right: 10}}
              activeOpacity={0.8}>
              <FavoriteIcon
                // fill={Colors.light.primaryButton}
                width={30}
                height={30}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      ))}
    </Swiper>
  );
};

export default PromoteImageCarousel;

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    // zIndex: 1000,
    // overflow: 'hidden',

    // overflow: 'visible',
  },
  wrapper: {
    height: 250,
    width: '100%',
    overflow: 'visible',
    zIndex: 10000,
  },
  slide: {
    // flex: 1,
    width: '100%',
  },
  favoriteIconWrapper: {
    position: 'absolute',
    top: 10, // Adjust as needed
    right: 10, // Adjust as needed
    zIndex: 100, // Ensures the icon is above other elements
  },
  imageBgStyle: {
    width: '100%',
    height: '100%',
    // height: height * 0.75,
    alignItems: 'flex-end',
    // overflow: 'hidden',
    // justifyContent: 'flex-end',
    // padding: 5,
    borderRadius: 10,
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
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 40,
    zIndex: 1000,
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
});
