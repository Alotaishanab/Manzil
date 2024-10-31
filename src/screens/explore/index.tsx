/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  PropertyCard,
  PropertyTypeModal,
  Screen,
  TopSpace,
  CardSkeleton,
  Ads,
  Survey,
} from '@components';
import FilterHeader from '../../../src/components/molecules/FilterHeader';
import { useIntl } from '@context';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Image,
  StyleSheet,
} from 'react-native';
import { globalStyles } from '@globalStyles';
import { Colors } from '@colors';
import { styles } from './styles';
import { ArrowForIcon } from '@svgs';
import { ag1, ag2, ag5, ag6, ag7 } from '@assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { refreshAnimation } from '@assets';
import LottieView from 'lottie-react-native';
import {
  useGetNearbyProperties,
  UserLocation,
  useGetInterestedProperties,
  GetInterestedPropertiesResponse,
  GetNearbyPropertiesResponse,
} from '@services';
import { AsyncHelper } from '@helpers';

export const Explore = () => {
  const navigation: any = useNavigation();
  const { intl } = useIntl();

  // Define the state for the properties modal
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);

  useEffect(() => {
    const markAsFirstTimeComplete = async () => {
      await AsyncHelper.setFirstTimeFlag(); // Mark the initial process as complete
    };

    markAsFirstTimeComplete();
  }, []);

  const [location, setLocation] = useState<UserLocation>({
    latitude: 37.76816965856596,
    longitude: -122.4264693260193,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: nearByData,
    isLoading: nearByLoading,
    error: nearByError,
  } = useGetNearbyProperties(location);
  const {
    data: interestedData,
    isLoading: interestedLoading,
    error: interestedError,
  } = useGetInterestedProperties();

  // Handle pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Optionally, trigger refetch here if your hooks support it
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!nearByLoading && !interestedLoading) {
      setIsLoading(false);
      // Handle errors
      if (nearByError || interestedError) {
        setError('Failed to load properties.');
      } else {
        setError(null);
      }
    } else {
      setIsLoading(true);
    }
  }, [nearByLoading, interestedLoading, nearByError, interestedError]);

  const handleFavoriteClick = (propertyId: number) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [propertyId]: !prevFavorites[propertyId],
    }));
  };

  // Combine Nearby and Interested properties
  const combinedProperties = useMemo(() => {
    const nearby = nearByData?.properties || [];
    const interested = interestedData?.properties || [];
    return [...nearby, ...interested];
  }, [nearByData, interestedData]);

  // Render skeletons when loading
  const renderSkeletons = () => {
    const skeletons = Array.from({ length: 5 }, (_, index) => (
      <CardSkeleton key={`skeleton-${index}`} />
    ));
    return <View>{skeletons}</View>;
  };

  // Sample Ads Data
  const sampleAdsData = [
    {
      id: 'ad1',
      image: { uri: 'https://via.placeholder.com/300' }, // Placeholder image
      title: 'Find the Best Properties',
      description: 'Discover great deals on properties near you!',
      onPress: () => console.log('Ad clicked'),
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
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
        return renderAgencies();
      default:
        return null;
    }
  };

  const renderAgencies = () => (
    <View style={styles.topAgencyWrap}>
      <View style={globalStyles.rowSpaceBetween}>
        <Text style={styles.topAgencyText}>
          {intl.formatMessage({
            id: 'explore.top-agencies',
          })}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Auth', { screen: 'AllAgencies' })}
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

  const combinedData = useMemo(() => {
    const data: any[] = [];
    combinedProperties.forEach((property, index) => {
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
  }, [combinedProperties]);

  // Toggle function for the properties modal
  const togglePropertyModal = () => {
    setShowPropertiesModal(!showPropertiesModal);
  };

  return (
    <Screen
      padding={0}
      paddingHorizontal={10}
      showKeyboardAware={false}
      style={{ backgroundColor: '#F5F5F5' }} // Background color for Screen
    >
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <FlatList
        data={isLoading ? [] : combinedData} // Show empty list if loading
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={renderItem}
        ListEmptyComponent={isLoading ? renderSkeletons() : null} // Render skeletons if loading
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
              onPress={() => navigation.navigate('Auth', { screen: 'PropertyFullScreen' })}
              style={styles.aiSearchContainer}
              activeOpacity={0.8}
            >
              <View style={styles.aiSearchContent}>
                <Text style={styles.aiSearchText}>Explore with AI</Text>
                <Icon
                  name="robot-outline"
                  size={20}
                  color={Colors.light.primaryBtn}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </>
        }
      />
    </Screen>
  );
};


