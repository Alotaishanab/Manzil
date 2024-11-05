// src/screens/Explore.tsx

/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  PropertyCard,
  Screen,
  TopSpace,
  CardSkeleton,
  Ads,
  Survey,
  AgencyItem,
} from '@components';
import FilterHeader from '../../../src/components/molecules/FilterHeader';
import { useIntl } from '@context';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@colors';
import { styles } from './styles';
import { globalStyles } from '../../../src/styles/globalStyles';
import { ArrowForIcon } from '@svgs';
import { ag1, ag2, ag5, ag6, ag7 } from '@assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { refreshAnimation } from '@assets';
import LottieView from 'lottie-react-native';
import Haptic from 'react-native-haptic-feedback';
import { SimilarProperties } from '@screens';
import {
  useGetNearbyProperties,
  UserLocation,
  useGetInterestedProperties,
} from '@services';
import { AsyncHelper } from '@helpers';

export const Explore = () => {
  const navigation: any = useNavigation();
  const { intl } = useIntl();


  useEffect(() => {
    const setFirstTimeIfNeeded = async () => {
      const isFirstTime = await AsyncHelper.isFirstTime();
      if (isFirstTime) {
        await AsyncHelper.setFirstTimeFlag(); // Set the flag to indicate it's no longer the first time
        console.log("First time flag set. This message should only appear once.");
      }
    };

    setFirstTimeIfNeeded(); // Run the check on component mount
  }, []);

  // Define sampleAdsData before using it in renderItem
  const sampleAdsData = useMemo(
    () => [
      {
        id: 'ad1',
        image: { uri: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Ad+1' },
        title: 'Find the Best Properties',
        description: 'Discover great deals on properties near you!',
        onPress: () => console.log('Ad 1 clicked'),
      },
      {
        id: 'ad2',
        image: { uri: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=Ad+2' },
        title: 'Luxury Homes Available',
        description: 'Explore our collection of luxury homes.',
        onPress: () => console.log('Ad 2 clicked'),
      },
      {
        id: 'ad3',
        image: { uri: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Ad+3' },
        title: 'Affordable Apartments',
        description: 'Find affordable apartments in your area.',
        onPress: () => console.log('Ad 3 clicked'),
      },
      {
        id: 'ad4',
        image: { uri: 'https://via.placeholder.com/300/FFFF00/FFFFFF?text=Ad+4' },
        title: 'Modern Condos for Sale',
        description: 'Check out our modern condo listings.',
        onPress: () => console.log('Ad 4 clicked'),
      },
      {
        id: 'ad5',
        image: { uri: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=Ad+5' },
        title: 'Spacious Villas Available',
        description: 'Discover spacious villas perfect for families.',
        onPress: () => console.log('Ad 5 clicked'),
      },
      // Add more ads as needed
    ],
    []
  );

  const [location, setLocation] = useState<UserLocation>({
    latitude: 37.76816965856596,
    longitude: -122.4264693260193,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Removed adsVisible state
  const [showBottomWidget, setShowBottomWidget] = useState<boolean>(false); // Tracks Bottom Widget visibility

  // State for FilterModal
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

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

  // Ref for the search TextInput
  const searchInputRef = useRef<TextInput>(null);

  // Handle pull to refresh
  // Handle pull to refresh
const onRefresh = useCallback(() => {
  // Trigger haptic feedback
  Haptic.trigger("impactMedium", {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });

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

  // Define your agencies with images and names
  const agencies = useMemo(
    () => [
      { id: 'ag5', image: ag5, name: 'Agency Five' },
      { id: 'ag6', image: ag6, name: 'Agency Six' },
      { id: 'ag7', image: ag7, name: 'Agency Seven' },
      { id: 'ag2', image: ag2, name: 'Agency Two' },
      { id: 'ag1', image: ag1, name: 'Agency One' },
    ],
    [ag1, ag2, ag5, ag6, ag7]
  );

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
        return <Ads ads={sampleAdsData} isVisible={true} />;
      case 'survey':
        return (
          <Survey
            question="Are you satisfied with the property listings?"
            onYes={() => console.log('User answered Yes')}
            onNo={() => console.log('User answered No')}
          />
        );
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
          accessibilityLabel="View all agencies"
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
        data={agencies}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <AgencyItem
            image={item.image}
            name={item.name}
            onPress={() => {
              // Handle agency press, e.g., navigate to agency details
              console.log(`${item.name} pressed`);
              navigation.navigate('Auth', { screen: 'AgencyDetails', params: { agencyId: item.id } });
            }}
            accessibilityLabel={`View details for ${item.name}`}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.agenciesList}
      />
    </View>
  );


// src/screens/Explore.tsx

const renderRecommendedSection = () => (
  <View style={styles.recommendedSectionWrap}>
    <View style={globalStyles.rowSpaceBetween}>
      <Text style={styles.recommendedTitle}>
        {intl.formatMessage({
          id: 'explore.recommended-for-you', // Ensure this ID exists in your internationalization files
        })}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Auth', { screen: 'propertyfullscreen' })}
        style={globalStyles.simpleRow}
        accessibilityLabel="Search more with AI"
      >
        <Text style={styles.searchWithAiText}>
          {intl.formatMessage({
            id: 'buttons.explore-with-ai', // Ensure this ID exists in your localization files
          })}
        </Text>
        <ArrowForIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
    <TopSpace top={10} />
    <SimilarProperties /> 
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
      }
    });
    return data;
  }, [combinedProperties]);

  // Toggle function for the FilterModal
  const toggleFilterModal = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Function to apply filters (implement filter logic as needed)
  const handleApplyFilters = () => {
    // Implement filter logic
    console.log('Filters applied');
    toggleFilterModal();
  };

  // Function to focus the search input
  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // onScroll handler to track scroll position and control bottom widget visibility
  const onScroll = useCallback((event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const headerHeight = 300; // Adjust based on actual header height
    if (scrollY > headerHeight && !showBottomWidget) {
      setShowBottomWidget(true);
    } else if (scrollY <= headerHeight && showBottomWidget) {
      setShowBottomWidget(false);
    }
  }, [showBottomWidget]);

  const renderHeaderComponent = () => (
    <>
      <FilterHeader
        isFilterVisible={isFilterVisible}
        toggleFilterModal={toggleFilterModal}
        onApplyFilters={handleApplyFilters}
        textInputRef={searchInputRef}
      />
      {refreshing && (
  <View style={{ alignItems: 'center', marginBottom: 0 }}>
    <ActivityIndicator size="small" color={Colors.light.primary} />
  </View>
)}

      {renderAgencies()}
      {renderRecommendedSection()} 
    </>
  );

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
        ListHeaderComponent={renderHeaderComponent}
        onScroll={onScroll}
        scrollEventThrottle={16} // To ensure onScroll is called frequently
      />
      {showBottomWidget && (
        <View style={styles.bottomWidget}>
          <TouchableOpacity
            style={styles.widgetButton}
            onPress={focusSearchInput}
            accessibilityLabel="Focus on search input"
          >
            <Icon name="magnify" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.widgetButton}
            onPress={toggleFilterModal}
            accessibilityLabel="Open filter options"
          >
            <Icon name="filter-variant" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
};

export default Explore;
