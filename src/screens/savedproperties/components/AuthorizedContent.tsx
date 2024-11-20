import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { fonts } from '../../../../src/assets/fonts';
import { Colors } from '@colors';
import AuthorizedHeader from './AuthorizedHeader';
import { TabButtons, TopSpace, CardSkeleton, PropertyCard } from '@components'; // Import CardSkeleton
import { useIntl } from '@context';
import { globalStyles } from '@globalStyles';
import { useNavigation } from '@react-navigation/native';

const AuthorizedContent = ({
  toggleModalVisible,
  selectedSortOption,
  savedProperties,
  propertiesLoading,
  isError,
}) => {
  const { intl } = useIntl();
  const navigation = useNavigation();

  const [btnSelected, setBtnSelected] = React.useState(
    intl.formatMessage({ id: 'buttons.for-sale' }),
  );

  // Filter properties based on the selected tab (For Sale or To Rent)
  const filteredProperties = savedProperties.filter(property =>
    btnSelected === intl.formatMessage({ id: 'buttons.for-sale' })
      ? property.property_type === 'Sell'
      : property.property_type === 'Rent'
  );

  const handleCard = (property) => {
    navigation.navigate('PropertyScreen', { property });
  };

  const renderProperty = ({ item }) => (
    <PropertyCard
      sliderWidth={'90%'}
      marginBottom={8}
      item={item}
      handleClick={() => handleCard(item)}
    />
  );

  return (
    <View style={styles.mainWrap}>
      <AuthorizedHeader />
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

      <View style={[globalStyles.simpleRow, { alignSelf: 'flex-end' }]}>
        <TouchableOpacity onPress={toggleModalVisible} style={styles.searchButton}>
          <Text style={styles.searchText}>
            {selectedSortOption || intl.formatMessage({ id: 'savedPropertyScreen.search' })}
          </Text>
          <Text style={styles.dropdownIcon}> ▼ </Text>
        </TouchableOpacity>
      </View>

      <TopSpace top={10} />

      {propertiesLoading ? (
        // Render multiple CardSkeletons for loading state
        Array(5).fill(null).map((_, index) => <CardSkeleton key={index} />)
      ) : isError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {intl.formatMessage({ id: 'errors.fetch-saved-properties' })}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProperties}
          contentContainerStyle={styles.flatListContentContainerStyle}
          ListFooterComponent={<View style={styles.footer} />}
          renderItem={renderProperty}
          keyExtractor={(item) => item.property_id.toString()}
        />
      )}
    </View>
  );
};

export default AuthorizedContent;

const styles = StyleSheet.create({
  mainWrap: {
    flex: 1,
    backgroundColor: Colors.light.secondaryBackground,
  },
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
  footer: {
    height: 10,
  },
  flatListContentContainerStyle: {
    width: '100%',
    paddingHorizontal: 3,
    overflow: 'hidden',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.light.error,
  },
});
