import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '@colors';
import { fonts } from '@fonts';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = width * 0.6;
const SPACING = 10;
const STACK_OFFSET = 15;

export const MediaCarousel = ({ media, setMedia }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (media[currentIndex]?.type?.startsWith('video')) {
      setIsVideoPlaying(true);
    } else {
      setIsVideoPlaying(false);
    }
  }, [currentIndex, media]);

  // Open media picker
  const openMediaPicker = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 0,
      },
      response => {
        if (!response.didCancel && response.assets) {
          const currentMedia = Array.isArray(media) ? media : [];
          const selectedMedia = response.assets.filter(asset => asset.uri);
          setMedia([...currentMedia, ...selectedMedia]);
        }
      }
    );
  };

  // Render main carousel items
  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING),
      index * (ITEM_WIDTH + SPACING),
      (index + 1) * (ITEM_WIDTH + SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp',
    });

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-STACK_OFFSET, 0, STACK_OFFSET],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          { transform: [{ scale }, { translateX }] },
        ]}
      >
        {item.type?.startsWith('video') ? (
          <Video
            source={{ uri: item.uri }}
            style={styles.media}
            resizeMode="cover"
            controls={true}
            paused={currentIndex !== index || !isVideoPlaying}
            onBuffer={() => console.log('Buffering...')}
            onError={(e) => console.log('Error with video:', e)}
          />
        ) : (
          <ImageBackground
            source={{ uri: item.uri }}
            style={styles.media}
            imageStyle={styles.mediaImage}
          />
        )}
      </Animated.View>
    );
  };

  // Render thumbnails below the main carousel
  const renderThumbnails = () => (
    <FlatList
      data={media}
      horizontal
      keyExtractor={(item, index) => `${item.uri}-${index}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.thumbnailContainer}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => setCurrentIndex(index)} activeOpacity={0.7}>
          <View style={[
            styles.thumbnail,
            currentIndex === index && styles.activeThumbnail,
          ]}>
            {item.type?.startsWith('video') ? (
              <Video
                source={{ uri: item.uri }}
                style={styles.thumbnailContent}
                resizeMode="cover"
                paused={true}
              />
            ) : (
              <ImageBackground
                source={{ uri: item.uri }}
                style={styles.thumbnailContent}
                imageStyle={{ borderRadius: 10 }}
              />
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.carouselContainer}>
      {media.length > 0 ? (
        <>
          <Animated.FlatList
            data={media}
            horizontal
            keyExtractor={(item, index) => `${item.uri}-${index}`}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH + SPACING}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: SPACING }}
          />
          <Text style={styles.mainMediaMessage}>Select Main Media to Display</Text>
        </>
      ) : (
        <TouchableOpacity onPress={openMediaPicker} style={styles.noMediaContainer}>
          <Text style={styles.noMediaText}>+ Add Media</Text>
        </TouchableOpacity>
      )}

      {media.length > 0 && renderThumbnails()}

      {media.length > 0 && (
        <TouchableOpacity onPress={openMediaPicker} style={styles.addMediaLink}>
          <Text style={styles.addMediaLinkText}>+ Add More Media</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MediaCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: ITEM_HEIGHT + 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING / 2,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#000', // For better contrast while loading
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  mediaImage: {
    borderRadius: 15,
  },
  thumbnailContainer: {
    marginTop: 8,
    paddingHorizontal: SPACING,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: Colors.light.primaryBtn,
  },
  thumbnailContent: {
    width: '100%',
    height: '100%',
  },
  noMediaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  noMediaText: {
    fontSize: 16,
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.medium,
  },
  mainMediaMessage: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
  },
  addMediaLink: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  addMediaLinkText: {
    color: Colors.light.primaryBtn,
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
});
