import React, { useState, useEffect } from 'react';import {
  Animated,
  FlatList,
  ImageBackground,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Share from 'react-native-share';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Make sure this package is installed
import {TopSpace} from '@components';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import HapticFeedback from 'react-native-haptic-feedback';
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  HeartIcon,
  HeartOutlineIcon,
  ShareIcon,
  LivingRoomIcon,
  GateIcon,
  StreetIcon,
  FootTrafficIcon,
  StorageIcon,
  FloorIcon,
  WaterIcon,
  ElectricityIcon,
  SewageIcon,
} from '@svgs'; // Ensure all icons are correctly imported
import {useIntl} from '@context';

const {width: screenWidth} = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.8;
const SPACING = 20;
const STACK_OFFSET = 60;

export const PropertyCard = ({
  item,
  marginBottom = 15,
  handleClick = () => {},
  isFavorite = false, // Whether the property is favorited
  handleFavoriteClick = () => {}, // To toggle favorite status
}) => {
  const {intl} = useIntl();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // Trigger haptic feedback when pressed
    HapticFeedback.trigger('selection');

    // Call the original favorite click handler
    handleFavoriteClick();
  };



  const media = [...(item?.property_images || []), ...(item?.property_videos || [])].filter(Boolean);



  const options = {
    title: 'Share this property',
    message: 'Check out this property!',
    url: media[currentIndex]?.uri,
  };

  const handleShare = () => {
    Share.open(options)
      .then((res) => console.log(res))
      .catch((err) => {
        err && console.log(err);
      });
  };

  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };

  const formatPrice = (price) => {
    // Format the price and remove .00 if exists
    return parseFloat(price).toLocaleString();
  };


  const renderPropertyIcons = () => {
    const { property_category } = item || {}; // Use property_category instead of property_type
    
    return (
      <View style={styles.iconRow}>
        {/* Row 1: Area */}
      {item?.area && (
        <View style={styles.iconWrapper}>
          <AreaIcon width={24} height={24} />
          <Text style={styles.countText}>{`${parseInt(item.area).toLocaleString()} sq ft`}</Text>
        </View>
      )}

  
        {/* House specific icons */}
        {property_category === 'House' && (
          <>
            {item?.bedrooms && (
              <View style={styles.iconWrapper}>
                <BedIcon width={20} height={20} />
                <Text style={styles.countText}>{`${item.bedrooms} Beds`}</Text>
              </View>
            )}
            {item?.bathrooms && (
              <View style={styles.iconWrapper}>
                <BathroomIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.bathrooms} Baths`}</Text>
              </View>
            )}
            {item?.living_rooms && (
              <View style={styles.iconWrapper}>
                <LivingRoomIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.living_rooms} Living Room(s)`}</Text>
              </View>
            )}
          </>
        )}
  
        {/* Land specific icons */}
        {property_category === 'Land' && (
          <>
            {item?.has_water && (
              <View style={styles.iconWrapper}>
                <WaterIcon width={28} height={28} />
                <Text style={styles.countText}>Has Water</Text>
              </View>
            )}
            {item?.has_electricity && (
              <View style={styles.iconWrapper}>
                <ElectricityIcon width={28} height={28} />
                <Text style={styles.countText}>Has Electricity</Text>
              </View>
            )}
            {item?.has_sewage && (
              <View style={styles.iconWrapper}>
                <SewageIcon width={28} height={28} />
                <Text style={styles.countText}>Has Sewage</Text>
              </View>
            )}
            {item?.number_of_streets && (
              <View style={styles.iconWrapper}>
                <StreetIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.number_of_streets} Streets`}</Text>
              </View>
            )}
            {item?.direction && (
              <View style={styles.iconWrapper}>
                <Text style={styles.countText}>{`Direction: ${item.direction}`}</Text>
              </View>
            )}
          </>
        )}
  
        {/* Warehouse specific icons */}
        {property_category === 'Warehouse' && (
          <>
            {item?.number_of_gates && (
              <View style={styles.iconWrapper}>
                <GateIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.number_of_gates} Gates`}</Text>
              </View>
            )}
            {item?.storage_capacity && (
              <View style={styles.iconWrapper}>
                <StorageIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.storage_capacity} Capacity`}</Text>
              </View>
            )}
          </>
        )}
  
        {/* Office specific icons */}
        {property_category === 'Office' && (
          <>
            {item?.floors && (
              <View style={styles.iconWrapper}>
                <FloorIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.floors} Floors`}</Text>
              </View>
            )}
            {item?.living_rooms && (
              <View style={styles.iconWrapper}>
                <LivingRoomIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.living_rooms} Living Room(s)`}</Text>
              </View>
            )}
          </>
        )}
  
        {/* Chalet specific icons */}
        {property_category === 'Chalet' && (
          <>
            {item?.bedrooms && (
              <View style={styles.iconWrapper}>
                <BedIcon width={20} height={20} />
                <Text style={styles.countText}>{`${item.bedrooms} Beds`}</Text>
              </View>
            )}
            {item?.bathrooms && (
              <View style={styles.iconWrapper}>
                <BathroomIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.bathrooms} Baths`}</Text>
              </View>
            )}
            {item?.living_rooms && (
              <View style={styles.iconWrapper}>
                <LivingRoomIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.living_rooms} Living Room(s)`}</Text>
              </View>
            )}
          </>
        )}
  
        {/* Farmhouse specific icons */}
        {property_category === 'Farmhouse' && (
          <>
            {item?.bedrooms && (
              <View style={styles.iconWrapper}>
                <BedIcon width={20} height={20} />
                <Text style={styles.countText}>{`${item.bedrooms} Beds`}</Text>
              </View>
            )}
            {item?.bathrooms && (
              <View style={styles.iconWrapper}>
                <BathroomIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.bathrooms} Baths`}</Text>
              </View>
            )}
            {item?.living_rooms && (
              <View style={styles.iconWrapper}>
                <LivingRoomIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.living_rooms} Living Room(s)`}</Text>
              </View>
            )}
          </>
        )}
  
        {/* Tower specific icons */}
        {property_category === 'Tower' && (
          <>
            {item?.floors && (
              <View style={styles.iconWrapper}>
                <FloorIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.floors} Floors`}</Text>
              </View>
            )}
            {item?.number_of_units && (
              <View style={styles.iconWrapper}>
                <BedIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.number_of_units} Units`}</Text>
              </View>
            )}
          </>
        )}
  
        {/* Workers' Residence specific icons */}
        {property_category === 'Workers Residence' && (
          <>
            {item?.number_of_units && (
              <View style={styles.iconWrapper}>
                <BedIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.number_of_units} Units`}</Text>
              </View>
            )}
            {item?.living_rooms && (
              <View style={styles.iconWrapper}>
                <LivingRoomIcon width={28} height={28} />
                <Text style={styles.countText}>{`${item.living_rooms} Living Room(s)`}</Text>
              </View>
            )}
          </>
        )}
  
        {/* Shop specific icons */}
        {property_category === 'Shop' && (
          <>
            {item?.foot_traffic && (
              <View style={styles.iconWrapper}>
                <FootTrafficIcon width={28} height={28} />
                <Text style={styles.countText}>{`Foot Traffic: ${item.foot_traffic}`}</Text>
              </View>
            )}
          </>
        )}
      </View>
    );
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

  const renderContent = () => {
    return (
      <View style={styles.propertyContainer}>
        {/* Property Details */}
        {renderPropertyDetails()}
  
        {/* Property Icons */}
        {renderPropertyIcons()}
      </View>
    );
  };

  const getDateInEnglish = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <TouchableHighlight
      onPress={handleClick}
      underlayColor="rgba(0, 0, 0, 0.05)"
      style={[styles.mainWrapper]}
    >
      <View>
        {/* Image Carousel */}
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
  
                return item ? (
                  <Animated.View
                    style={[
                      styles.imageContainer,
                      { transform: [{ scale }, { translateX }] },
                    ]}
                  >
                    {/* TouchableOpacity for the image click action */}
                    <TouchableOpacity onPress={() => console.log('Image clicked')} activeOpacity={0.8}>
                      <ImageBackground
                        source={{ uri: item }}
                        style={styles.imageBgContainer}
                        imageStyle={styles.imageBgStyle}
                      >
                        {/* TouchableOpacity for the favorite button */}
                        <TouchableOpacity
      onPress={handlePress}
      style={styles.favoriteButton}
      activeOpacity={0.7}
    >
      {isFavorite ? (
        <HeartIcon width={30} height={30} />
      ) : (
        <HeartOutlineIcon width={30} height={30} />
      )}
    </TouchableOpacity>
                      </ImageBackground>
                    </TouchableOpacity>
                  </Animated.View>
                ) : null;
              }}
            />
          ) : (
            <Text>No media available</Text>
          )}
        </View>
  
        {/* Property Details */}
        <View style={styles.contentWrapper}>
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
            {renderPropertyIcons()}
          </View>
  
          <View style={styles.footerWrap}>
            <Text style={styles.dateText}>
              {item?.listing_date ? `Added on ${new Date(item.listing_date).toLocaleDateString('en-US')}` : 'Date not available'}
            </Text>
            <TouchableOpacity onPress={() => Share.open({ message: 'Check out this property!' })} style={styles.shareButton}>
              <ShareIcon width={28} height={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );  
};


const styles = StyleSheet.create({
  mainWrapper: {
    paddingVertical: 15,
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: Colors.light.background,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
    width: '100%',
    overflow: 'hidden',
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
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
  },
  priceLocationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  priceFeaturedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 16,
    width: 1,
    backgroundColor: Colors.light.serialNoGreen,
    marginHorizontal: 8,
  },
  featuredText: {
    color: Colors.light.serialNoGreen,
    fontSize: 16,
    fontFamily: fonts.primary.bold,
  },
  priceText: {
    color: Colors.light.headingTitle,
    fontSize: 28,
    fontFamily: fonts.primary.bold,
  },
  placeText: {
    color: Colors.light.serialNoGreen,
    fontSize: 18,
    fontFamily: fonts.primary.medium,
  },
  propertyTypeText: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    marginTop: 5,
  },
  countText: {
    marginLeft: 5,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  propertyContainer: {
    flexDirection: 'column', // Stack details and icons vertically
    alignSelf: 'flex-start',  // Align content to the left
    marginTop: 4,  // Add some space between the header and the first element
  },
  iconRow: {
    flexDirection: 'row',  // Icons in a row
    alignItems: 'center',  // Align icons and text vertically
    marginTop: 10,  // Space between the text and the icons
    flexWrap: 'wrap',  // Allow icons to wrap if there are many
  },
  iconWrapper: {
    flexDirection: 'row',  // Icon and text side by side
    alignItems: 'center',  // Vertically align icons and text
    marginRight: 20,  // Space between icons
  },
  footerWrap: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  dateText: {
    color: Colors.light.serialNoGreen,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
  shareButton: {
    paddingHorizontal: 5,
  },
  // Skeleton styles
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
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping icons to the next row
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default PropertyCard;
