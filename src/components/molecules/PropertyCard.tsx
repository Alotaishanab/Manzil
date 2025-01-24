import React, { useState, useRef } from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Share from 'react-native-share';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { TopSpace } from '@components';
import { BlurView } from '@react-native-community/blur'; // Import BlurView
import { Colors } from '@colors';
import { fonts } from '@fonts';
import HapticFeedback from 'react-native-haptic-feedback';
import {
  HeartIcon,
  HeartOutlineIcon,
  ShareIcon,
  PlayIcon,
} from '@svgs';
import { useIntl } from '@context';
import { useSaveProperty } from '@services';
import { useNavigation } from '@react-navigation/native';
import { isVideo, isImage } from '../../utils/mediaUtils';
import { renderPropertyIcons } from '@helpers'; // Adjust path as needed

const { width: screenWidth } = Dimensions.get('window');
// Reduced some dimensions to make everything a bit smaller
const ITEM_WIDTH = screenWidth * 0.75;
const SPACING = 15;
const STACK_OFFSET = 45;

export const PropertyCard = ({
  item,
  marginBottom = 10, // made smaller
  handleClick = () => {},
  isFavorite = false,
  handleFavoriteClick = () => {},
}) => {
  const { intl } = useIntl();
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Use the save property mutation hook
  const { mutate: saveProperty, isLoading: isSaving } = useSaveProperty();

  const handlePropertyClick = () => {
    // Navigate to PropertyScreen through the Auth stack and pass property_id as a parameter
    navigation.navigate('Auth', {
      screen: 'PropertyScreen',
      params: { propertyId: item.property_id },
    });
  };

  const handlePress = () => {
    // Trigger haptic feedback when pressed
    HapticFeedback.trigger('selection');

    // Log the item to debug
    console.log("Property item:", item);
    console.log("Property ID:", item.property_id);

    if (!item.property_id) {
      console.error("property_id is undefined");
      return;
    }

    // Optimistically toggle favorite state
    handleFavoriteClick();

    // Trigger save property mutation
    saveProperty(
      { property_id: item.property_id },
      {
        onSuccess: (data) => {
          console.log('Property saved successfully:', data);
        },
        onError: (error) => {
          console.error('Error saving property:', error);
          // Revert the favorite toggle on error
          handleFavoriteClick();
        },
      }
    );
  };

  // Media = images + videos
  const images = item?.property_images || [];
  const videos = item?.property_videos || [];
  const media = [...images, ...videos].filter(Boolean);

  const options = {
    title: 'Share this property',
    message: 'Check out this property!',
    url: media[currentVisibleIndex],
  };

  const handleShare = () => {
    Share.open(options)
      .then((res) => console.log(res))
      .catch((err) => {
        err && console.log(err);
      });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString();
  };

  const renderPropertyDetails = () => {
    const propertyCategory = item?.property_category || 'Home';
    const propertyType = item?.property_type?.toLowerCase() || 'sale';
    const saleOrRent = propertyType === 'sell' ? 'For Sale' : 'For Rent';

    return (
      <Text style={styles.propertyTypeText}>
        {`${propertyCategory} ${saleOrRent}`}
      </Text>
    );
  };

  // FlatList config
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  });

  const getDateInEnglish = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={[styles.mainWrapper, { marginBottom }]}>
      {/* The blurred glass background */}
      <BlurView
        style={styles.blurView}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      {/* Slight frosty overlay on top of the blur */}
      <View style={styles.glassOverlay} />

      {/* Carousel (images/videos) */}
      <View style={styles.carouselContainer}>
        {media.length > 0 ? (
          <Animated.FlatList
            data={media}
            horizontal
            keyExtractor={(item, index) => `${item}-${index}`}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH + SPACING}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (ITEM_WIDTH + SPACING),
                index * (ITEM_WIDTH + SPACING),
                (index + 1) * (ITEM_WIDTH + SPACING),
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: 'clamp',
              });

              const translateX = scrollX.interpolate({
                inputRange,
                outputRange: [-STACK_OFFSET, 0, STACK_OFFSET],
                extrapolate: 'clamp',
              });

              const isCurrent = index === currentVisibleIndex;
              const isVid = isVideo(item);

              return (
                <Animated.View
                  style={[
                    styles.imageContainer,
                    { transform: [{ scale }, { translateX }] },
                  ]}
                >
                  {isImage(item) ? (
                    <TouchableOpacity onPress={handlePropertyClick} activeOpacity={0.8}>
                      <ImageBackground
                        source={{ uri: item }}
                        style={styles.imageBgContainer}
                        imageStyle={styles.imageBgStyle}
                      >
                        {/* Favorite button inside the image */}
                        <TouchableOpacity
                          onPress={handlePress}
                          style={styles.favoriteButton}
                          activeOpacity={0.7}
                          disabled={isSaving}
                        >
                          {isFavorite ? (
                            <HeartIcon width={25} height={25} />
                          ) : (
                            <HeartOutlineIcon width={25} height={25} />
                          )}
                        </TouchableOpacity>
                      </ImageBackground>
                    </TouchableOpacity>
                  ) : isVid ? (
                    <View style={styles.videoContainer}>
                      <Video
                        source={{ uri: item }}
                        style={styles.videoStyle}
                        controls={true}
                        paused={!isCurrent}
                        repeat={true}
                        resizeMode="cover"
                        onError={(error) => {
                          console.error('Video Playback Error:', error);
                        }}
                      />
                      {/* Play button overlay */}
                      {!isCurrent && (
                        <TouchableOpacity
                          onPress={() => setCurrentVisibleIndex(index)}
                          style={styles.playButton}
                          activeOpacity={0.7}
                        >
                          {PlayIcon ? (
                            <PlayIcon width={40} height={40} />
                          ) : (
                            <Text style={{ color: '#fff', fontSize: 20 }}>▶️</Text>
                          )}
                        </TouchableOpacity>
                      )}
                      {/* Favorite button in the video */}
                      <TouchableOpacity
                        onPress={handlePress}
                        style={styles.favoriteButton}
                        activeOpacity={0.7}
                        disabled={isSaving}
                      >
                        {isFavorite ? (
                          <HeartIcon width={25} height={25} />
                        ) : (
                          <HeartOutlineIcon width={25} height={25} />
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </Animated.View>
              );
            }}
          />
        ) : (
          <View style={styles.noMediaContainer}>
            <Text style={styles.noMediaText}>No media available</Text>
            {/* Favorite button even if no media */}
            <TouchableOpacity
              onPress={handlePress}
              style={styles.favoriteButton}
              activeOpacity={0.7}
              disabled={isSaving}
            >
              {isFavorite ? (
                <HeartIcon width={25} height={25} />
              ) : (
                <HeartOutlineIcon width={25} height={25} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* The actual content */}
      <TouchableHighlight
        onPress={handlePropertyClick}
        underlayColor="rgba(255, 255, 255, 0.1)"
        style={styles.contentWrapper}
      >
        <View>
          {/* Property details */}
          <View style={styles.priceLocationContainer}>
            <View style={styles.priceFeaturedContainer}>
              <Text style={styles.priceText}>
                {item?.price ? `${formatPrice(item.price)} ﷼` : 'Price not available'}
              </Text>
            </View>
            <Text style={styles.placeText}>
              {item?.address || 'Address not available'}
            </Text>
            {renderPropertyDetails()}
            {renderPropertyIcons(item)}
          </View>

          <View style={styles.footerWrap}>
            <Text style={styles.dateText}>
              {item?.listing_date
                ? `Added on ${getDateInEnglish(item.listing_date)}`
                : 'Date not available'}
            </Text>
            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <ShareIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10, // smaller
    // We keep backgroundColor transparent for the glass effect
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  // The BlurView behind everything
  blurView: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  // A frosty overlay on top of the BlurView
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 2,
    borderRadius: 15,
  },
  contentWrapper: {
    // This ensures content is above the frosty overlay
    zIndex: 3,
    paddingHorizontal: 15, // reduced
    paddingVertical: 10, // reduced
  },
  carouselContainer: {
    zIndex: 5, // keep media above the blur
    height: 270, // slightly smaller
    alignItems: 'center',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: 270,
    marginHorizontal: SPACING / 2,
    borderRadius: 15, // smaller
    overflow: 'hidden',
    position: 'relative',
  },
  imageBgContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBgStyle: {
    borderRadius: 15, // smaller
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoStyle: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10, // smaller
    right: 10, // smaller
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 10, // smaller
    padding: 3, // smaller
    zIndex: 999, // ensure on top
  },
  playButton: {
    position: 'absolute',
    zIndex: 999,
    width: 50, // smaller
    height: 50, // smaller
    borderRadius: 25, // smaller
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMediaContainer: {
    width: ITEM_WIDTH,
    height: 270, // match the new height
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMediaText: {
    color: Colors.light.headingTitleDark,
    fontFamily: fonts.primary.medium,
    fontSize: 14, // smaller
  },
  priceLocationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: 8, // smaller
  },
  priceFeaturedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: Colors.light.headingTitleDark,
    fontSize: 24, // smaller
    fontFamily: fonts.primary.bold,
  },
  placeText: {
    color: Colors.light.headingTitleDark,
    fontSize: 16, // smaller
    fontFamily: fonts.primary.medium,
  },
  propertyTypeText: {
    color: Colors.light.headingTitleDark,
    fontSize: 14, // smaller
    fontFamily: fonts.primary.bold,
    marginTop: 4,
  },
  footerWrap: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8, // smaller
  },
  dateText: {
    color: Colors.light.serialNoGreen,
    fontFamily: fonts.primary.regular,
    fontSize: 10, // smaller
  },
  shareButton: {
    paddingHorizontal: 3, // smaller
  },
});

export default PropertyCard;
