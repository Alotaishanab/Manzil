import React, { useEffect, useState } from 'react';
import {
  HeaderBackButtonTitle,
  PropertyCard,
  TabButtons,
  TopSpace,
  CardSkeleton,
} from '@components';
import { useIntl } from '@context';
import { globalStyles } from '@globalStyles';
import {
  FlatList,
  Platform,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useGetUserProperties, Property } from '@services';
import { AsyncHelper } from '@helpers';
import { Colors } from '@colors';

type FilterType = 'all' | 'featured' | 'not-featured';

interface PropertyCardItem {
  item: Property;
}

const SKELETON_COUNT = 3;

export const ListedProperties = () => {
  const { intl } = useIntl();
  const [selectedBtn, setSelectedBtn] = useState<FilterType>('all');
  const [userId, setUserId] = useState<number | null>(null);

  const tabs = {
    featured: intl.formatMessage({ id: 'listedPropertyScreen.featured' }),
    notFeatured: intl.formatMessage({ id: 'listedPropertyScreen.not-featured' }),
    all: intl.formatMessage({ id: 'listedPropertyScreen.all' }),
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncHelper.getUserId();
        if (id) {
          setUserId(Number(id));
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  //  ---- Fetch user properties with infinite query ----
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  } = useGetUserProperties({
    page_size: 10,
    // If user selected "featured" or "not-featured", pass is_featured
    ...(selectedBtn === 'featured' || selectedBtn === 'not-featured'
      ? { is_featured: selectedBtn === 'featured' }
      : {}),
  });

  // Flatten data => all pages => "properties"
  const allProperties = React.useMemo(() => {
    // SWITCH from 'page => page.results' to 'page => page.properties'
    return data?.pages.flatMap((page) => page.properties) || [];
  }, [data?.pages]);

  // Apply local filter
  const properties = React.useMemo(() => {
    switch (selectedBtn) {
      case 'featured':
        return allProperties.filter((prop) => prop.is_featured);
      case 'not-featured':
        return allProperties.filter((prop) => !prop.is_featured);
      default:
        return allProperties;
    }
  }, [allProperties, selectedBtn]);

  const handleTabChange = (option: string) => {
    let newFilter: FilterType = 'all';
    if (option === tabs.featured) newFilter = 'featured';
    else if (option === tabs.notFeatured) newFilter = 'not-featured';
    setSelectedBtn(newFilter);
  };

  const renderListedProperty = ({ item }: PropertyCardItem) => (
    <PropertyCard item={item} />
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return <View style={{ marginBottom: 0 }} />;
    return (
      <View style={styles.footerLoadingContainer}>
        <CardSkeleton />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} />
          ))}
        </>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {intl.formatMessage({ id: 'listedPropertyScreen.noProperties' })}
        </Text>
      </View>
    );
  };

  // If we haven't retrieved userID yet, show skeleton
  if (userId === null) {
    return (
      <View style={styles.loadingContainer}>
        <CardSkeleton />
      </View>
    );
  }

  // If there's an error from the query
  if (isError && error instanceof Error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {intl.formatMessage({ id: 'common.error' }, { message: error.message })}
        </Text>
        <Text style={styles.retryText} onPress={() => refetch()}>
          {intl.formatMessage({ id: 'common.tapToRetry' })}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[globalStyles.wrapScreen]}>
      <View style={styles.container}>
        <HeaderBackButtonTitle
          text={intl.formatMessage({ id: 'listedPropertyScreen.header' })}
        />
        <TopSpace top={10} />

        <TabButtons
          options={[tabs.featured, tabs.notFeatured, tabs.all]}
          onSelect={handleTabChange}
          borderRadius={20}
          paddingVertical={10}
          selectedOption={
            selectedBtn === 'featured'
              ? tabs.featured
              : selectedBtn === 'not-featured'
              ? tabs.notFeatured
              : tabs.all
          }
        />

        <TopSpace top={5} />

        <FlatList
          data={properties}
          renderItem={renderListedProperty}
          keyExtractor={(item) => item.property_id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContainer,
            properties.length === 0 && styles.emptyListContainer,
          ]}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 32,
  },
  loadingContainer: {
    flex: 1,
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  footerLoadingContainer: {
    paddingVertical: 20,
  },
});

