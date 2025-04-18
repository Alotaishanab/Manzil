import {Colors} from '@colors';
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {fonts} from '../../assets/fonts';
import {GalleryIcon} from '@svgs';
import {ActivityIndicator} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

export const ImageCarousel = ({images = []}: any) => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // state to track the current index

  console.log('images', images.length);
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        index={currentIndex}
        onIndexChanged={index => setCurrentIndex(index)}
        paginationStyle={[styles.pagination, {}]}
        renderPagination={(index, total) => {
          console.log('total:', total);
          return (
            <View style={[styles.pagination]}>
              <GalleryIcon width={18} height={18} />
              <Text style={styles.paginationText}>
                {images?.length > 0 ? index + 1 : 0}
                {total ? `/${total - 1}` : `/${total}`}
              </Text>
            </View>
          );
        }}>
        {images?.map(
          (image: {uri: any}, index: React.Key | null | undefined) => (
            <View key={index} style={[styles.slide]}>
              <ImageBackground
                resizeMode="cover"
                source={{uri: image.uri}}
                style={styles.imageBgStyle}
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
              />
            </View>
          ),
        )}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    // flex: 1,
  },
  wrapper: {},
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  imageBgStyle: {
    width: width,
    height: height * 0.75,
    // justifyContent: 'flex-end',
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
