// src/screens/Explore.tsx
/* eslint-disable react-native/no-inline-styles */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  PropertyCard,
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
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@colors';
import { globalStyles } from '../../../src/styles/globalStyles';
import { ArrowForIcon } from '@svgs';
import { ag1, ag2, ag5, ag6, ag7 } from '@assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        await AsyncHelper.setFirstTimeFlag();
      }
    };
    setFirstTimeIfNeeded();
  }, []);

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
    ],
    []
  );

  const [location] = useState<UserLocation>({
    latitude: 37.76816965856596,
    longitude: -122.4264693260193,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBottomWidget, setShowBottomWidget] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const { data: nearByData, isLoading: nearByLoading, error: nearByError } =
    useGetNearbyProperties(location);
  const {
    data: interestedData,
    isLoading: interestedLoading,
    error: interestedError,
  } = useGetInterestedProperties();

  const searchInputRef = useRef<TextInput>(null);

  const onRefresh = useCallback(() => {
    Haptic.trigger('impactMedium', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!nearByLoading && !interestedLoading) {
      setIsLoading(false);
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
    setFavorites((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  const combinedProperties = useMemo(() => {
    const nearby = nearByData?.properties || [];
    const interested = interestedData?.properties || [];
    return [...nearby, ...interested];
  }, [nearByData, interestedData]);

  const renderSkeletons = () => (
    <View>
      {Array.from({ length: 5 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </View>
  );

  const agencies = useMemo(
    () => [
      { id: 'ag5', image: ag5, name: 'Agency Five' },
      { id: 'ag6', image: ag6, name: 'Agency Six' },
      { id: 'ag7', image: ag7, name: 'Agency Seven' },
      { id: 'ag2', image: ag2, name: 'Agency Two' },
      { id: 'ag1', image: ag1, name: 'Agency One' },
    ],
    []
  );

  const renderItem = ({ item }: { item: any }) => {
    switch (item.type) {
      case 'property':
        return (
          <PropertyCard
            item={item.data}
            isFavorite={favorites[item.data.property_id]}
            handleFavoriteClick={() =>
              handleFavoriteClick(item.data.property_id)
            }
          />
        );
      case 'ads':
        return <Ads ads={sampleAdsData} isVisible />;
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
          {intl.formatMessage({ id: 'explore.top-agencies' })}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Auth', { screen: 'AllAgencies' })}
          style={globalStyles.simpleRow}
        >
          <Text style={styles.sellAll}>
            {intl.formatMessage({ id: 'buttons.sell-all' })}
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
            onPress={() =>
              navigation.navigate('Auth', {
                screen: 'AgencyDetails',
                params: { agencyId: item.id },
              })
            }
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.agenciesList}
      />
    </View>
  );

  const renderRecommendedSection = () => (
    <View style={styles.recommendedSectionWrap}>
      <View style={globalStyles.rowSpaceBetween}>
        <Text style={styles.recommendedTitle}>
          {intl.formatMessage({ id: 'explore.recommended-for-you' })}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Auth', { screen: 'propertyfullscreen' })
          }
          style={globalStyles.simpleRow}
        >
          <Text style={styles.searchWithAiText}>
            {intl.formatMessage({ id: 'buttons.explore-with-ai' })}
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
      if (index === 0) data.push({ type: 'ads' });
      else if (index === 2) data.push({ type: 'survey' });
    });
    return data;
  }, [combinedProperties]);

  const toggleFilterModal = () => setIsFilterVisible(!isFilterVisible);
  const handleApplyFilters = () => {
    console.log('Filters applied');
    toggleFilterModal();
  };
  const focusSearchInput = () => {
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  const onScroll = useCallback(
    (event) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      const headerHeight = 250;
      if (scrollY > headerHeight && !showBottomWidget) setShowBottomWidget(true);
      else if (scrollY <= headerHeight && showBottomWidget)
        setShowBottomWidget(false);
    },
    [showBottomWidget]
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={isLoading ? [] : combinedData}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={renderItem}
        ListEmptyComponent={isLoading ? renderSkeletons() : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
            colors={[Colors.light.primary]}
          />
        }
        ListHeaderComponent={
          <>
            {/* Green header container with header text and search/filter bar */}
            <View style={styles.greenHeader}>
              <Text style={styles.greetingTitle}>Hello, Welcome Home!</Text>
              <Text style={styles.greetingSubtitle}>
                Discover your perfect place with Manzil.
              </Text>
              <FilterHeader
                isFilterVisible={isFilterVisible}
                toggleFilterModal={toggleFilterModal}
                onApplyFilters={handleApplyFilters}
                textInputRef={searchInputRef}
                // Remove containerStyle if not used by FilterHeader; or pass it here if needed.
              />
            </View>
            {renderAgencies()}
            {renderRecommendedSection()}
          </>
        }
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.list}
      />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {showBottomWidget && (
        <View style={styles.bottomWidgetContainer}>
          <View style={styles.bottomWidget}>
            <TouchableOpacity style={styles.widgetButton} onPress={focusSearchInput}>
              <Icon name="magnify" size={20} color="#fff" />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.widgetButton} onPress={toggleFilterModal}>
              <Icon name="filter-variant" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // You can either keep the SafeAreaView background as green
    // or set it to a neutral color so that only the header area is green.
    backgroundColor: Colors.light.primaryButton,
  },
  greenHeader: {
    backgroundColor: Colors.light.primaryButton,
    padding: 20,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  greetingSubtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  flatListContent: {
    paddingBottom: 120,
    // Here we set the background for the scrollable content.
    backgroundColor: Colors.light.background,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  topAgencyWrap: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  topAgencyText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  sellAll: {
    fontSize: 16,
    color: Colors.light.primary,
  },
  agenciesList: {
    paddingVertical: 10,
  },
  recommendedSectionWrap: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  searchWithAiText: {
    fontSize: 16,
    color: Colors.light.primary,
  },
  errorContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: Colors.light.errorBackground,
    borderRadius: 8,
    padding: 10,
  },
  errorText: {
    color: Colors.light.errorText,
    textAlign: 'center',
  },
  bottomWidgetContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 20 : 0,
    left: 20,
    right: 20,
  },
  bottomWidget: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  widgetButton: {
    padding: 10,
  },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: '#fff',
  },
});

export default Explore;
