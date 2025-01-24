import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Haptic from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import your new scroll-out header
import {
  PropertyCard,
  TopSpace,
  CardSkeleton,
  Ads,
  Survey,
  AgencyItem,
  ScrollOutHeader,
} from '@components';
import { useIntl } from '@context';
import { Colors } from '@colors';
import { globalStyles } from '../../../src/styles/globalStyles';
import { ArrowForIcon } from '@svgs';
import { ag1, ag2, ag5, ag6, ag7 } from '@assets';
import {
  useGetNearbyProperties,
  UserLocation,
  useGetInterestedProperties,
} from '@services';
import { AsyncHelper } from '@helpers';

export const Explore = () => {
  const navigation: any = useNavigation();
  const { intl } = useIntl();
  const insets = useSafeAreaInsets();

  // Normal data/fetch states
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBottomWidget, setShowBottomWidget] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const searchInputRef = useRef<TextInput>(null);

  // Example location & data
  const [location] = useState<UserLocation>({
    latitude: 37.768,
    longitude: -122.426,
  });
  const { data: nearByData, isLoading: nearByLoading, error: nearByError } =
    useGetNearbyProperties(location);
  const {
    data: interestedData,
    isLoading: interestedLoading,
    error: interestedError,
  } = useGetInterestedProperties();

  // Combine loading & error
  useEffect(() => {
    const loadingNow = nearByLoading || interestedLoading;
    setIsLoading(loadingNow);
    if (!loadingNow) {
      if (nearByError || interestedError) {
        setError('Failed to load properties.');
      } else {
        setError(null);
      }
    }
  }, [nearByLoading, interestedLoading, nearByError, interestedError]);

  useEffect(() => {
    const checkFirstTime = async () => {
      if (await AsyncHelper.isFirstTime()) {
        await AsyncHelper.setFirstTimeFlag();
      }
    };
    checkFirstTime();
  }, []);

  const onRefresh = useCallback(() => {
    Haptic.trigger('impactMedium');
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // Combine properties
  const combinedProperties = useMemo(() => {
    const nearby = nearByData?.properties || [];
    const interested = interestedData?.properties || [];
    return [...nearby, ...interested];
  }, [nearByData, interestedData]);

  const handleFavoriteClick = (propertyId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  // Example ads
  const sampleAdsData = useMemo(() => [
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
  ], []);

  // For loading skeletons
  const renderSkeletons = () => (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </>
  );

  // Agencies
  const agencies = useMemo(() => [
    { id: 'ag5', image: ag5, name: 'Agency Five' },
    { id: 'ag6', image: ag6, name: 'Agency Six' },
    { id: 'ag7', image: ag7, name: 'Agency Seven' },
    { id: 'ag2', image: ag2, name: 'Agency Two' },
    { id: 'ag1', image: ag1, name: 'Agency One' },
  ], []);

  // Render agencies
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
          <Text style={styles.sellAll}>{intl.formatMessage({ id: 'buttons.sell-all' })}</Text>
          <ArrowForIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <TopSpace top={10} />
      <FlatList
        data={agencies}
        horizontal
        keyExtractor={(item) => item.id}
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

  // Combine property data with ads/survey
  const combinedData2 = useMemo(() => {
    const data: any[] = [];
    combinedProperties.forEach((prop, index) => {
      data.push({ type: 'property', data: prop });
      if (index === 0) data.push({ type: 'ads' });
      if (index === 2) data.push({ type: 'survey' });
    });
    return data;
  }, [combinedProperties]);

  // Render item
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
        return <Ads ads={sampleAdsData} isVisible />;
      case 'survey':
        return (
          <Survey
            question="Are you satisfied with the property listings?"
            onYes={() => console.log('Yes')}
            onNo={() => console.log('No')}
          />
        );
      default:
        return null;
    }
  };

  // Filter logic
  const toggleFilterModal = () => setIsFilterVisible(!isFilterVisible);
  const handleApplyFilters = () => {
    console.log('Filters applied');
    toggleFilterModal();
  };
  const focusSearchInput = () => searchInputRef.current?.focus();

  return (
    <View style={styles.container}>
      {/* The entire header is part of the scroll content, so it's placed in ListHeaderComponent */}
      <FlatList
        data={isLoading ? [] : combinedData2}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
            colors={[Colors.light.primary]}
          />
        }
        ListEmptyComponent={isLoading ? renderSkeletons() : null}
        // 1) Place your green glass "ScrollOutHeader" at the very top
        // 2) Then your agencies below that
        ListHeaderComponent={
          <>
            <ScrollOutHeader
              isFilterVisible={isFilterVisible}
              toggleFilterModal={toggleFilterModal}
              onApplyFilters={handleApplyFilters}
              textInputRef={searchInputRef}
            />
            {renderAgencies()}
          </>
        }
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      {/* Error Handling */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* If you still want a bottom widget, up to you. */}
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
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 120,
  },
  list: {
    flex: 1,
  },
  greenHeader: {
    backgroundColor: Colors.light.primaryButton,
    padding: 20,
  },
  propertiesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    color: '#333',
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
