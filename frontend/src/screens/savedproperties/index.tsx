import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from '@context';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { globalStyles } from '@globalStyles';
import { refreshAnimation } from '@assets';

// Components
import {
  CardSkeleton,
  SavedSearchModal,
  TabButtons,
  TopSpace,
  PropertyCard,
  AddPropertyBack,
} from '@components';
import { useGetSavedProperties } from '@services';

export const SavedProperties: React.FC = () => {
  const navigation = useNavigation();
  const { intl } = useIntl();
  const queryClient = useQueryClient();

  // Sorting & Modal
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Tab state: "For Sale" or "To Rent"
  const [btnSelected, setBtnSelected] = useState(
    intl.formatMessage({ id: 'buttons.for-sale' })
  );

  // For custom Lottie refresh animation
  const [isManuallyRefreshing, setIsManuallyRefreshing] = useState(false);

  // Toggle the sort modal
  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle sort selection
  const handleSortSelection = (option: string) => {
    setSelectedSortOption(option);
    toggleModalVisible();
  };

  // Fetch saved properties with React Query
  const {
    data: savedPropertiesData,
    isLoading: propertiesLoading,
    isError,
    refetch: refetchSavedProperties,
  } = useGetSavedProperties({
    retry: 1,
    onError: (error) => {
      console.error('Error fetching saved properties:', error);
      // You can show an alert if needed
    },
  });

  // 1) Refetch on screen focus
  useFocusEffect(
    useCallback(() => {
      refetchSavedProperties();
    }, [refetchSavedProperties])
  );

  // 2) Pull-to-refresh
  const handleRefresh = async () => {
    setIsManuallyRefreshing(true);
    try {
      await queryClient.invalidateQueries(['savedProperties']);
      await refetchSavedProperties();
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      setIsManuallyRefreshing(false);
    }
  };

  // Navigate back
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Filter the fetched properties by the selected tab
  const savedProperties = savedPropertiesData?.properties || [];
  const filteredProperties = savedProperties.filter((property) =>
    btnSelected === intl.formatMessage({ id: 'buttons.for-sale' })
      ? property.property_type === 'Sell'
      : property.property_type === 'Rent'
  );

  // Navigate to property detail
  const handleCardPress = (property: any) => {
    navigation.navigate('PropertyScreen', { property });
  };

  // Render each property
  const renderProperty = ({ item }: { item: any }) => (
    <PropertyCard
      sliderWidth="90%"
      marginBottom={8}
      item={item}
      handleClick={() => handleCardPress(item)}
    />
  );

  // Renders above the FlatList
  const ListHeader = () => {
    return (
      <View>
        {/* Header with back button */}
        <View style={styles.headerView}>
          <AddPropertyBack
            text={intl.formatMessage({ id: 'savedPropertyScreen.saved' })}
            onPress={handleBackPress}
          />
        </View>

        {/* Tab Buttons */}
        <TabButtons
          options={[
            intl.formatMessage({ id: 'buttons.for-sale' }),
            intl.formatMessage({ id: 'buttons.to-rent' }),
          ]}
          onSelect={(option) => setBtnSelected(option)}
          borderRadius={10}
          paddingVertical={10}
          selectedOption={btnSelected}
        />

        <TopSpace top={10} />

        {/* Sort button */}
        <View style={[globalStyles.simpleRow, { alignSelf: 'flex-end' }]}>
          <TouchableOpacity onPress={toggleModalVisible} style={styles.searchButton}>
            <Text style={styles.searchText}>
              {selectedSortOption ||
                intl.formatMessage({ id: 'savedPropertyScreen.search' })}
            </Text>
            <Text style={styles.dropdownIcon}> ▼ </Text>
          </TouchableOpacity>
        </View>

        <TopSpace top={10} />
      </View>
    );
  };

  // Main content
  const renderContent = () => {
    if (propertiesLoading) {
      // Show skeleton
      return (
        <>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <CardSkeleton key={index} />
            ))}
        </>
      );
    }

    if (isError) {
      // Show error
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {intl.formatMessage({ id: 'errors.fetch-saved-properties' })}
          </Text>
        </View>
      );
    }

    // Show list
    return (
      <FlatList
        data={filteredProperties}
        keyExtractor={(item: any) => item.property_id.toString()}
        renderItem={renderProperty}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={<View style={styles.footer} />}
        contentContainerStyle={styles.flatListContentContainerStyle}
        // Pull-to-refresh
        refreshing={isManuallyRefreshing}
        onRefresh={handleRefresh}
      />
    );
  };

  return (
    <View style={styles.screenContainer}>
      {/* If you want a Lottie while isManuallyRefreshing or isLoading */}
      {(isManuallyRefreshing || propertiesLoading) && (
        <View style={styles.lottieOverlay}>
          <LottieView
            source={refreshAnimation}
            autoPlay
            loop
            style={styles.refreshAnimation}
          />
        </View>
      )}

      {/* Main content */}
      {renderContent()}

      {/* Sort modal */}
      <SavedSearchModal
        isVisible={isModalVisible}
        toggleVisible={toggleModalVisible}
        onSelectOption={handleSortSelection}
      />
    </View>
  );
};

export default SavedProperties;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 40, // Move screen content down more
  },

  // Overlaid Lottie for refreshing / loading
  lottieOverlay: {
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
    zIndex: 999,
  },
  refreshAnimation: {
    width: 60,
    height: 60,
  },

  // Header
  headerView: {
    backgroundColor: Colors.light.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  // Sort button
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 16,
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.medium,
  },
  dropdownIcon: {
    fontSize: 16,
    color: Colors.light.primaryBtn,
    marginLeft: 5,
  },

  // Error container
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.light.error,
  },

  // FlatList
  flatListContentContainerStyle: {
    width: '100%',
    paddingHorizontal: 3,
  },
  footer: {
    height: 10,
  },
});
