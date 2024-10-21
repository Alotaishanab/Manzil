/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  PropertyCard,
  PropertyTypeModal,
  Screen,
  TopSpace,
  CardSkeleton,
} from '@components';
import {useExploreProps} from './useExploreProps';
import FilterHeader from '../../../src/components/molecules/FilterHeader';
import {width} from '../../hooks/useDimension';
import {useIntl} from '@context';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {styles} from './styles';
import {ArrowForIcon, ArrowForwardIcon} from '@svgs';
import {ag1, ag2, ag5, ag6, ag7} from '@assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { refreshAnimation } from '@assets'; // Import the animation
import LottieView from 'lottie-react-native';
import {
  useGetNearbyProperties,
  UserLocation,
  useGetInterestedProperties,
} from '@services';

export const Explore = () => {
  const [location, setLocation] = useState<UserLocation>({
    latitude: 37.76816965856596, // Example latitude
    longitude: -122.4264693260193, // Example longitude
  });

  const [refreshing, setRefreshing] = useState(false);

  // Handle pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [favorites, setFavorites] = useState({});

  // Toggle favorite status for a specific property
  const handleFavoriteClick = (propertyId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [propertyId]: !prevFavorites[propertyId], // Toggle favorite status
    }));
  };
  
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [mediaLoading, setMediaLoading] = useState(true); 
  
  const {data: nearByProperties} = useGetNearbyProperties(location);
  const {data: interestedProperties} = useGetInterestedProperties();

  console.log('nearByProperties', nearByProperties);
  console.log('interestedProperties', interestedProperties);

  useEffect(() => {
    if (nearByProperties && nearByProperties.properties) {
      setProperties(nearByProperties.properties);
      setIsLoading(false); // Stop main loading when data is fetched
    } else {
      setIsLoading(true); // Keep loading while fetching data
    }
  }, [nearByProperties]);

  const handleMediaLoadComplete = () => {
    setMediaLoading(false); // Stop media loading once all media is loaded
  };

  const renderItem = ({ item }) => {
    if (item && item.property_id) {
      return (
        <PropertyCard
          item={item}
          isFavorite={favorites[item.property_id]} // Check if the property is favorited
          handleFavoriteClick={() => handleFavoriteClick(item.property_id)} // Pass the favorite handler
        />
      );
    }
    return null;
  };



  const navigation: any = useNavigation();
  const {
    onFocusInput,
  } = useExploreProps();
  const {intl} = useIntl();
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const handleCard = () => {
    navigation.navigate('PropertyScreen');
  };


  const [showPropertiesModal, setShowPropertiesModal] = useState(false);

  const togglePropertyModal = () => {
    setShowPropertiesModal(!showPropertiesModal);
  };


  const handleSelectPropertyType = (type: React.SetStateAction<null>) => {
  };

  const agencies = [ag5, ag6, ag7, ag2, ag1];


  
  return (
    <Screen padding={0} paddingHorizontal={10} showKeyboardAware={false}>
      <ScrollView
  contentContainerStyle={{
    flexGrow: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 20,
    width: '100%',
  }}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="transparent"   // Hide default iOS spinner
      colors={['transparent']}  // Hide default Android spinner
    />
  }
>
  {/* Filter Header (Search Bar) */}
  <FilterHeader
/>

  {/* Lottie Animation for pull to refresh */}
  {refreshing && (
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <LottieView
              source={refreshAnimation}
              autoPlay
              loop
              style={{ width: 50, height: 50 }} // Adjust size as needed
            />
          </View>
        )}

        {/* Updated Smart Search with AI Option */}
<TouchableOpacity
  onPress={() => navigation.navigate('PropertyFullScreen')}
  style={styles.aiSearchContainer}
  activeOpacity={0.8} // Add subtle opacity effect on press
>
  <View style={styles.aiSearchContent}>
    <Text style={styles.aiSearchText}>Explore with AI</Text>
    <Icon name="robot-outline" size={20} color={Colors.light.primaryBtn} style={styles.icon} />
  </View>
</TouchableOpacity>



<View style={{ flex: 1 }}>
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : properties.length > 0 ? (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.property_id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      ) : (
        <Text>No properties available</Text>
      )}
    </View>

        {/* <TopSpace top={30} /> */}

        <View style={[styles.topAgencyWrap, {}]}>
          <View style={globalStyles.rowSpaceBetween}>
            <Text style={styles.topAgencyText}>
              {intl.formatMessage({
                id: 'explore.top-agencies',
              })}
            </Text>

            <Pressable
              onPress={() => {
                navigation.navigate('AllAgencies');
              }}
              style={globalStyles.simpleRow}>
              <Text style={styles.sellAll}>
                {intl.formatMessage({
                  id: 'buttons.sell-all',
                })}
                {'  '}
              </Text>
              <ArrowForIcon width={20} height={20} />
            </Pressable>

            {/*  */}
          </View>

          <TopSpace top={10} />

          <View style={{ flex: 1 }}>
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : properties.length > 0 ? (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.property_id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      ) : (
        <Text>No properties available</Text>
      )}
    </View>
        </View>
        <TopSpace top={30} />

        
      </ScrollView>
      <PropertyTypeModal
        isVisible={showPropertiesModal}
        modalTitle={intl.formatMessage({
          id: 'landPropertyDetailScreen.property-type',
        })}
        toggleModal={togglePropertyModal}
        selectedPropertyType={selectedPropertyType}
        handleClick={handleSelectPropertyType}
        // setSelectedPropertyType={handleSelectPropertyType}
      />


    </Screen>
  );
};
