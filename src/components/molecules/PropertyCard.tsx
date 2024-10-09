import React from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Share from 'react-native-share';
import {TopSpace} from '@components';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  HeartIcon,
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
} from '@svgs';
import {useIntl} from '@context';

const {width: screenWidth} = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.8;
const SPACING = 20;
const STACK_OFFSET = 60;

export const PropertyCard = ({
  item,
  marginBottom = 15,
  handleClick = () => {},
}) => {
  const { intl } = useIntl();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // Debugging: Log the item object to see the full data
  console.log('PropertyCard item:', item);

  // Combine and filter out invalid media
  const media = [...(item?.property_images || []), ...(item?.property_videos || [])].filter(m => m?.uri);

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

  // Function to render property icons based on available data
  const renderPropertyIcons = () => {
    const { property_type } = item || {}; // Safe access to item

    return (
      <View style={styles.iconRow}>
        {item?.area && (
          <View style={styles.iconWrapper}>
            <AreaIcon width={24} height={24} />
            <Text style={styles.countText}>{`${item.area} sq ft`}</Text>
          </View>
        )}
        {property_type === 'House' && (
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
        {property_type === 'Land' && (
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
          </>
        )}
      </View>
    );
  };

  // Render the property type and whether it's for sale or rent
const renderPropertyDetails = () => {
  const propertyType = item?.property_type?.toLowerCase() || 'unknown';

  let propertyStatus = '';

  // Handle different types of property statuses based on property_type
  if (propertyType === 'sell') {
    propertyStatus = 'For Sale';
  } else if (propertyType === 'rent') {
    propertyStatus = 'For Rent';
  } else {
    propertyStatus = 'Unknown'; // Fallback for unexpected or undefined values
  }

  return (
    <Text style={styles.propertyTypeText}>
      {propertyStatus} {/* Instead of 'Sell - Sell' or 'Rent - Rent', it will now show 'For Sale' or 'For Rent' */}
    </Text>
  );
};


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleClick}
      style={[
        styles.mainWrapper,
        {
          marginBottom: marginBottom,
        },
      ]}>
      <View style={styles.carouselContainer}>
        {media.length > 0 ? (
          <Animated.FlatList
            data={media}
            horizontal
            keyExtractor={(item, index) => item.uri ? `${item.uri}-${index}` : `media-${index}`}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH + SPACING}
            decelerationRate="fast"
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

              return item?.uri ? (
                <Animated.View
                  style={[
                    styles.imageContainer,
                    {
                      transform: [{ scale }, { translateX }],
                    },
                  ]}
                >
                  {item.uri.includes('video') ? (
                    <View style={styles.videoContainer}>
                      <Text style={styles.videoText}>Video</Text>
                    </View>
                  ) : (
                    <ImageBackground
                      source={{ uri: item.uri }}
                      style={styles.imageBgContainer}
                      imageStyle={styles.imageBgStyle}
                    >
                      <View style={styles.favoriteButton}>
                        <HeartIcon width={30} height={30} />
                      </View>
                    </ImageBackground>
                  )}
                </Animated.View>
              ) : null;
            }}
          />
        ) : (
          <Text>No media available</Text>
        )}
      </View>

      <TopSpace top={10} />

      {/* Price and Location */}
      <View style={styles.priceLocationContainer}>
        <Text style={styles.priceText}>
          {item?.price ? item.price.toLocaleString() : 'Price not available'} ﷼
        </Text>
        <Text style={styles.placeText}>
          {item?.location || 'Location not available'}
        </Text>
        {/* Property Type and Sale/Rent Status */}
        {renderPropertyDetails()}
      </View>

      <TopSpace top={5} />

      {/* Render property icons */}
      {renderPropertyIcons()}

      <TopSpace top={20} />
      <View style={styles.footerWrap}>
        <View style={styles.underlineContainer}>
          <Text style={styles.dateText}>
            {item?.listing_date ? `Added on ${new Date(item.listing_date).toLocaleDateString()}` : 'Date not available'}
          </Text>
        </View>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <ShareIcon width={28} height={28} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  underlineContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.serialNoGreen,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  priceText: {
    color: Colors.light.headingTitle,
    fontSize: 28,
    fontFamily: fonts.primary.bold,
  },
  infoContainer: {
    paddingHorizontal: 20,
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
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default PropertyCard;
