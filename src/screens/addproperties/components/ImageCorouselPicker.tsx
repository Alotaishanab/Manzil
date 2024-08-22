import {Colors} from '@colors';
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {GalleryIcon, MultiWindowAddIcon} from '@svgs';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';

const {width, height} = Dimensions.get('window');

const ImageCarouselPicker = ({images = [], handlePicker}: any) => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // state to track the current index

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        index={currentIndex}
        // index={}
        onIndexChanged={index => setCurrentIndex(index)} // update index on change
        paginationStyle={[styles.pagination, {}]}
        renderPagination={(index, total) => {
          return (
            <View style={[styles.pagination]}>
              <GalleryIcon width={18} height={18} />
              <Text style={styles.paginationText}>
                {images?.length > 0 ? index + 1 : 0}
                {images?.length == 0 ? `/${total - 1}` : `/${total}`}
              </Text>
            </View>
          );
        }}>
        {images?.length > 0 ? (
          images?.map(
            (image: {uri: any}, index: React.Key | null | undefined) => (
              <View key={index} style={[styles.slide]}>
                <ImageBackground
                  resizeMode="cover"
                  source={{uri: image.uri}}
                  style={styles.imageBgStyle}
                  imageStyle={{
                    borderRadius: 10,
                  }}
                  // onLoadStart={() => setLoading(true)}
                  // onLoadEnd={() => setLoading(false)}
                />
              </View>
            ),
          )
        ) : (
          <Pressable onPress={() => handlePicker()} style={styles.addImageBtn}>
            <View style={globalStyles.simpleRow}>
              <MultiWindowAddIcon width={45} height={45} />
              <Text style={styles.addImageText}>Add image</Text>
            </View>
          </Pressable>
        )}
      </Swiper>
    </View>
  );
};

export default ImageCarouselPicker;

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
  addImageBtn: {
    width: width,
    height: '100%',
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 24,
    marginLeft: 5,
    fontFamily: fonts.primary.regular,
    color: Colors.light.headingTitle,
  },
});
