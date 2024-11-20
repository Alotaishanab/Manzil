// PropertyCard.js

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
  PlayIcon, // Ensure PlayIcon is correctly exported from '@svgs'
} from '@svgs';
import { useIntl } from '@context';
import { useSaveProperty } from '@services';
import { useNavigation } from '@react-navigation/native';
import { isVideo, isImage } from '../../utils/mediaUtils';
import { renderPropertyIcons } from '@helpers'; // Adjust the path as needed

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.8;
const SPACING = 20;
const STACK_OFFSET = 60;

export const PropertyCard = ({
  item,
  marginBottom = 15,
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

    // Ensure property_id is valid
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

  // Ensure images are first, then videos
  const images = item?.property_images || [];
  const videos = item?.property_videos || [];
  const media = [...images, ...videos].filter(Boolean);

  const options = {
    title: 'Share this property',
    message: 'Check out this property!',
    url: media[currentVisibleIndex], // Adjusted to use currentVisibleIndex
  };

  const handleShare = () => {
    Share.open(options)
      .then((res) => console.log(res))
      .catch((err) => {
        err && console.log(err);
      });
  };

  const formatPrice = (price) => {
    // Format the price and remove .00 if exists
    return parseFloat(price).toLocaleString();
  };

  const renderPropertyDetails = () => {
    const propertyCategory = item?.property_category || 'Home';
    const propertyType = item?.property_type?.toLowerCase() || 'sale'; // Assuming default 'sale'
    const saleOrRent = propertyType === 'sell' ? 'For Sale' : 'For Rent';

    return (
      <Text style={styles.propertyTypeText}>
        {`${propertyCategory} ${saleOrRent}`}
      </Text>
    );
  };

  // Viewability Config for FlatList
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // onViewableItemsChanged Callback
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
      {/* Apply BlurView as Background */}
      <BlurView
        style={styles.blurView}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.2)"
      />

      {/* Image and Video Carousel */}
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
                            <HeartIcon width={30} height={30} />
                          ) : (
                            <HeartOutlineIcon width={30} height={30} />
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
                        paused={!isCurrent} // Autoplay if current
                        repeat={true} // Loop the video
                        resizeMode="cover"
                        onError={(error) => {
                          console.error('Video Playback Error:', error);
                        }}
                      />
                      {/* Play Button Overlay */}
                      {!isCurrent && (
                        <TouchableOpacity
                          onPress={() => setCurrentVisibleIndex(index)}
                          style={styles.playButton}
                          activeOpacity={0.7}
                        >
                          {PlayIcon ? (
                            <PlayIcon width={50} height={50} />
                          ) : (
                            <Text style={{ color: '#fff', fontSize: 24 }}>▶️</Text> // Placeholder
                          )}
                        </TouchableOpacity>
                      )}
                      {/* Favorite button inside the video */}
                      <TouchableOpacity
                        onPress={handlePress}
                        style={styles.favoriteButton}
                        activeOpacity={0.7}
                        disabled={isSaving}
                      >
                        {isFavorite ? (
                          <HeartIcon width={30} height={30} />
                        ) : (
                          <HeartOutlineIcon width={30} height={30} />
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
            {/* Show favorite button even if there is no media */}
            <TouchableOpacity
              onPress={handlePress}
              style={styles.favoriteButton}
              activeOpacity={0.7}
              disabled={isSaving}
            >
              {isFavorite ? (
                <HeartIcon width={30} height={30} />
              ) : (
                <HeartOutlineIcon width={30} height={30} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Content over the BlurView */}
      <TouchableHighlight
        onPress={handlePropertyClick}
        underlayColor="rgba(255, 255, 255, 0.1)"
        style={styles.contentWrapper}
      >
        <View>
          {/* Property Details */}
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
            <TouchableOpacity
              onPress={handleShare}
              style={styles.shareButton}
            >
              <ShareIcon width={28} height={28} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'transparent', // Transparent to allow BlurView to handle the background
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
    width: '100%',
    overflow: 'hidden',
    position: 'relative', // Ensure absolute children are positioned relative to this container
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    zIndex: 0, // Ensure it stays below media and content
  },
  carouselContainer: {
    height: 300,
    alignItems: 'center',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: 300,
    marginHorizontal: SPACING / 2,
    borderRadius: 20,
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
    borderRadius: 20,
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
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
    zIndex: 2, // Ensure it stays above BlurView
  },
  playButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2, // Ensure it stays above BlurView
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 1, // Ensure content is above BlurView
  },
  priceLocationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  priceFeaturedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: Colors.light.headingTitleDark, // Use a darker color for better contrast
    fontSize: 28,
    fontFamily: fonts.primary.bold,
  },
  placeText: {
    color: Colors.light.headingTitleDark, // Darker color
    fontSize: 18,
    fontFamily: fonts.primary.medium,
  },
  propertyTypeText: {
    color: Colors.light.headingTitleDark, // Darker color
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    marginTop: 5,
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center icons
    alignItems: 'center',     // Vertically center icons
    padding: 5,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,  // Adjust horizontal spacing between icons
  },
  countText: {
    marginLeft: 5,
    color: Colors.light.headingTitleDark, // Darker color
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  footerWrap: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dateText: {
    color: Colors.light.serialNoGreen,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
  shareButton: {
    paddingHorizontal: 5,
  },
  noMediaContainer: {
    width: ITEM_WIDTH,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMediaText: {
    color: Colors.light.headingTitleDark, // Darker color for better contrast
    fontFamily: fonts.primary.medium,
    fontSize: 16,
  },
  // Skeleton styles (if needed)
  skeletonCard: {
    width: '100%',
    height: 300,
    marginBottom: 15,
    borderRadius: 20,
  },
  skeletonImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  skeletonText: {
    width: '60%',
    height: 20,
    marginTop: 10,
    borderRadius: 4,
  },
});

export default PropertyCard;
