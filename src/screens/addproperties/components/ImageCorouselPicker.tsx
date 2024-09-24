import { Colors } from '@colors';
import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video'; // Import video component for handling videos
import { GalleryIcon, MultiWindowAddIcon } from '@svgs';
import { fonts } from '@fonts';
import { globalStyles } from '@globalStyles';

const { width, height } = Dimensions.get('window');

export const ImageCarouselPicker = ({ media = [], handlePicker }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        index={currentIndex}
        onIndexChanged={(index) => setCurrentIndex(index)} // Update index on change
        scrollEnabled={true} // Ensure swiping is enabled
        removeClippedSubviews={false} // Prevent content from being clipped
        paginationStyle={[styles.pagination]}
        renderPagination={(index, total) => {
          return (
            <View style={[styles.pagination]}>
              <GalleryIcon width={18} height={18} />
              <Text style={styles.paginationText}>
                {media?.length > 0 ? index + 1 : 0}
                {media?.length == 0 ? `/${total - 1}` : `/${total}`}
              </Text>
            </View>
          );
        }}>
        {media?.length > 0 ? (
          media?.map((item: { uri: any, type: string }, index: React.Key | null | undefined) => (
            <View key={index} style={[styles.slide]}>
              {item.type.startsWith('video') ? (
                <Video
                  source={{ uri: item.uri }}
                  style={styles.mediaStyle}
                  resizeMode="cover"
                  controls={true} // Enable video controls like play, pause, etc.
                  paused={currentIndex !== index} // Play only the current video
                />
              ) : (
                <ImageBackground
                  resizeMode="cover"
                  source={{ uri: item.uri }}
                  style={styles.mediaStyle}
                  imageStyle={{
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
          ))
        ) : (
          <TouchableOpacity
            onPress={() => handlePicker()} // Only trigger onPress if not swiping
            style={styles.addMediaBtn}
            activeOpacity={0.7}
          >
            <View style={globalStyles.simpleRow}>
              <MultiWindowAddIcon width={45} height={45} />
              <Text style={styles.addMediaText}>Add media</Text>
            </View>
          </TouchableOpacity>
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
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.light.background, // Background color for container
  },
  wrapper: {
    // Customize wrapper if necessary
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: '100%',
  },
  mediaStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageBgStyle: {
    width: width,
    height: height * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: Colors.light.primaryBtn,
    fontSize: 18,
    marginLeft: 5,
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 40,
    width: 100, // Adjust pagination width for better alignment
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Add transparency to pagination background
  },
  paginationText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    marginLeft: 10,
    fontSize: 12,
  },
  addMediaBtn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
  },
  addMediaText: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: fonts.primary.regular,
    color: Colors.light.headingTitle,
  },
});
