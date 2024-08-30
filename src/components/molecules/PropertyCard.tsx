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
import {globalStyles} from '../../styles/globalStyles';
import {fonts} from '../../../src/assets/fonts';
import {Colors} from '@colors';
import Share from 'react-native-share';
import {TopSpace} from '@components';
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  GalleryIcon,
  HeartIcon,
  ShareIcon,
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
  const {intl} = useIntl();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const images = [
    {uri: 'https://picsum.photos/500/300', id: 1},
    {uri: 'https://picsum.photos/500/301', id: 2},
    {uri: 'https://picsum.photos/500/302', id: 3},
    {uri: 'https://picsum.photos/500/303', id: 4},
  ];

  const options = {
    title: 'Share this property',
    message: 'Check out this property!',
    url: images[currentIndex]?.uri,
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

  return (
    <View
      style={[
        styles.mainWrapper,
        {
          marginBottom: marginBottom,
        },
      ]}>
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          data={images}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH + SPACING}
          decelerationRate="fast"
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          style={{overflow: 'visible'}}
          contentContainerStyle={{paddingHorizontal: SPACING}}
          renderItem={({item, index}) => {
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

            return (
              <Animated.View
                style={[
                  styles.imageContainer,
                  {
                    transform: [{scale}, {translateX}],
                  },
                ]}>
                <ImageBackground
                  source={{uri: item.uri}}
                  style={styles.imageBgContainer}
                  imageStyle={styles.imageBgStyle}>
                  {/* Save Button on Image */}
                  <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.8}>
                    <HeartIcon width={30} height={30} />
                  </TouchableOpacity>
                </ImageBackground>
              </Animated.View>
            );
          }}
        />
      </View>

      <TouchableOpacity activeOpacity={0.9} onPress={handleClick}>
        <TopSpace top={10} />

        {/* Price and Location */}
        <View style={styles.priceLocationContainer}>
          
            <Text style={styles.priceText}>
              {item?.price ? item.price.toLocaleString() : '799,997'}﷼
            </Text>
          
          <Text style={styles.placeText}>
            {item?.location || 'Riyadh, Saudi Arabia'}
          </Text>
        </View>

        <TopSpace top={5} />
        <View style={styles.infoContainer}>
          <View style={styles.underlineContainer}>
            <Text style={styles.descriptionText}>
              {item?.description || 'House for Sale'}
            </Text>
          </View>

          <TopSpace top={5} />
          <View style={styles.iconRow}>
            <View style={styles.iconWrapper}>
              <BedIcon width={20} height={20} />
              <Text style={styles.countText}>
                {item?.beds ? `${item.beds} Beds` : '2 Beds'}
              </Text>
            </View>

            <View style={styles.iconWrapper}>
              <BathroomIcon width={28} height={28} />
              <Text style={styles.countText}>
                {item?.baths ? `${item.baths} Baths` : '2 Baths'}
              </Text>
            </View>

            <View style={styles.iconWrapper}>
              <AreaIcon width={24} height={24} />
              <Text style={styles.countText}>
                {item?.size ? item.size : '819 sq ft'}
              </Text>
            </View>
          </View>
        </View>

        <TopSpace top={20} />
        <View style={styles.footerWrap}>
          <View style={styles.underlineContainer}>
            <Text style={styles.dateText}>
              {item?.dateAdded ? `Added on ${item.dateAdded}` : 'Added on 09/05/2024'}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleShare}>
            <ShareIcon width={28} height={28} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
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
    alignSelf: 'flex-start', // Make sure underline is only as wide as text
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
  descriptionText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
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
});

export default PropertyCard;
