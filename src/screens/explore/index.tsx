/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  PropertyCard,
  PropertyTypeModal,
  Screen,
  TopSpace,
  CardSkeleton,
  Ads,
  Survey,
} from '@components';
import {useExploreProps} from './useExploreProps';
import FilterHeader from '../../../src/components/molecules/FilterHeader';
import {useIntl} from '@context';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Image,
} from 'react-native';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {styles} from './styles';
import {ArrowForIcon} from '@svgs';
import {ag1, ag2, ag5, ag6, ag7} from '@assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {refreshAnimation} from '@assets';
import LottieView from 'lottie-react-native';
import {
  useGetNearbyProperties,
  UserLocation,
  useGetInterestedProperties,
} from '@services';

export const Explore = () => {
  const [location, setLocation] = useState<UserLocation>({
    latitude: 37.76816965856596,
    longitude: -122.4264693260193,
  });

  const [refreshing, setRefreshing] = useState(false);

  // Handle pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [favorites, setFavorites] = useState({});
  
  const handleFavoriteClick = (propertyId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [propertyId]: !prevFavorites[propertyId],
    }));
  };

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  const {data: nearByProperties} = useGetNearbyProperties(location);
  const {data: interestedProperties} = useGetInterestedProperties();

  useEffect(() => {
    if (nearByProperties && nearByProperties.properties) {
      setProperties(nearByProperties.properties);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [nearByProperties]);

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'property':
        return (
          <PropertyCard
            item={item.data}
            isFavorite={favorites[item.data.property_id]}
            handleFavoriteClick={() => handleFavoriteClick(item.data.property_id)}
          />
        );
      case 'ads':
        return <Ads ads={sampleAdsData} />;
      case 'survey':
        return (
          <Survey
            question="Are you satisfied with the property listings?"
            onYes={() => console.log('User answered Yes')}
            onNo={() => console.log('User answered No')}
          />
        );
      case 'agencies':
        return renderAgencies(); // Insert the agency component here
      default:
        return null;
    }
  };

  const renderAgencies = () => (
    <View style={[styles.topAgencyWrap]}>
      <View style={globalStyles.rowSpaceBetween}>
        <Text style={styles.topAgencyText}>
          {intl.formatMessage({
            id: 'explore.top-agencies',
          })}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AllAgencies')}
          style={globalStyles.simpleRow}
        >
          <Text style={styles.sellAll}>
            {intl.formatMessage({
              id: 'buttons.sell-all',
            })}
            {'  '}
          </Text>
          <ArrowForIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <TopSpace top={10} />
      <FlatList
        data={[ag5, ag6, ag7, ag2, ag1]}
        keyExtractor={(item, index) => `agency-${index}`}
        horizontal
        renderItem={({ item }) => <Image source={item} style={styles.agencyImage} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const navigation: any = useNavigation();
  const {intl} = useIntl();
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);

  const togglePropertyModal = () => {
    setShowPropertiesModal(!showPropertiesModal);
  };

  const sampleAdsData = [
    {
      id: 'ad1',
      image: { uri: 'https://via.placeholder.com/300' }, // Placeholder image
      title: 'Find the Best Properties',
      description: 'Discover great deals on properties near you!',
      onPress: () => console.log('Ad clicked'),
    },
  ];

  const combinedData = useMemo(() => {
    const data = [];
    properties.forEach((property, index) => {
      data.push({ type: 'property', data: property });

      // Insert an ad after the first property and a survey after the third
      if (index === 0) {
        data.push({ type: 'ads' });
      } else if (index === 2) {
        data.push({ type: 'survey' });
      } else if (index === 5) {
        data.push({ type: 'agencies' }); // Insert agencies after the sixth property
      }
    });
    return data;
  }, [properties]);

  return (
    <Screen padding={0} paddingHorizontal={10} showKeyboardAware={false}>
      <FlatList
        data={combinedData}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
          backgroundColor: Colors.light.background,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="transparent"
            colors={['transparent']}
          />
        }
        ListHeaderComponent={
          <>
            <FilterHeader />
            {refreshing && (
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <LottieView
                  source={refreshAnimation}
                  autoPlay
                  loop
                  style={{ width: 50, height: 50 }}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('PropertyFullScreen')}
              style={styles.aiSearchContainer}
              activeOpacity={0.8}
            >
              <View style={styles.aiSearchContent}>
                <Text style={styles.aiSearchText}>Explore with AI</Text>
                <Icon name="robot-outline" size={20} color={Colors.light.primaryBtn} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </>
        }
      />
      <PropertyTypeModal
        isVisible={showPropertiesModal}
        modalTitle={intl.formatMessage({
          id: 'landPropertyDetailScreen.property-type',
        })}
        toggleModal={togglePropertyModal}
      />
    </Screen>
  );
};
