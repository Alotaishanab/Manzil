import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Text } from 'react-native';
import { fonts } from '../../../../src/assets/fonts';
import { Colors } from '@colors';
import AuthorizedHeader from './AuthorizedHeader';
import { PropertyCard, TabButtons, TopSpace } from '@components';
import { useIntl } from '@context';
import SavedCardSkeleton from '../../../components/molecules/CardSkeleton';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '@globalStyles';

const AuthorizedContent = ({ toggleModalVisible, selectedSortOption }: any) => {
  const { intl } = useIntl();
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [btnSelected, setBtnSelected] = useState(
    intl.formatMessage({
      id: 'buttons.for-sale',
    }),
  );

  const handleCard = () => {
    navigation.navigate('PropertyScreen');
  };

  const renderProperty = ({ item }: any) => {
    return (
      <PropertyCard
        sliderWidth={'90%'}
        marginBottom={8}
        item={item}
        handleClick={handleCard}
      />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <AuthorizedHeader />
      <View style={[styles.innerWrap, { paddingTop: 5, overflow: 'hidden' }]}>
        <TabButtons
          options={[
            intl.formatMessage({ id: 'buttons.for-sale' }),
            intl.formatMessage({ id: 'buttons.to-rent' }),
          ]}
          onSelect={setBtnSelected}
          borderRadius={10}
          paddingVertical={10}
          selectedOption={btnSelected}
        />
        <TopSpace top={10} />

        {/* Custom search button to open modal */}
        <View style={[globalStyles.simpleRow, { alignSelf: 'flex-end' }]}>
          <TouchableOpacity onPress={toggleModalVisible} style={styles.searchButton}>
            <Text style={styles.searchText}>
              {selectedSortOption || intl.formatMessage({ id: 'savedPropertyScreen.search' })} {/* Display selected sort option or 'Search' */}
            </Text>
            <Text style={styles.dropdownIcon}> ▼ </Text>
          </TouchableOpacity>
        </View>

        <TopSpace top={10} />

        {isLoading ? (
          <>
            <SavedCardSkeleton />
            <SavedCardSkeleton />
          </>
        ) : (
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7]}
            contentContainerStyle={styles.flatListContentContainerStyle}
            ListFooterComponent={<View style={styles.footer} />}
            renderItem={renderProperty}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default AuthorizedContent;

const styles = StyleSheet.create({
  innerWrap: {
    margin: 7,
    padding: 10,
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
});
