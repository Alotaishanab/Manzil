import React, {useState} from 'react';
import {Screen, TopSpace} from '@components';
import {View, Text, FlatList} from 'react-native';
import ExploreSearchHeader from './components/ExploreSearchHeader';
import TabButtons from '../../components/molecules/TabButtons';
import {LocationPinIcon} from '@svgs';
import {Colors} from '@colors';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import SearchResults from './components/SearchResults';
import {useIntl} from '@context';
import SuggestedSearches from './components/SuggestSearches';

export const ExploreSearch = () => {
  const {intl} = useIntl();
  const [selectedBtn, setSelectedBtn] = useState(
    intl.formatMessage({
      id: 'buttons.for-rent',
    }),
  );
  const navigation: any = useNavigation();
  const onFocusInput = () => {
    navigation.navigate('ExploreSearch');
  };
  const handleCard = () => {
    navigation.navigate('Explore');
  };
  const renderSearch = ({}) => {
    return <SearchResults handleClick={handleCard} />;
  };

  const renderSuggestedSearches = () => {
    return <SuggestedSearches handleClick={handleCard} />;
  };

  return (
    <Screen showKeyboardAware={false}>
      <View>
        <ExploreSearchHeader onFocusInput={onFocusInput} />

        <TopSpace top={15} />
        <TabButtons
          options={[
            intl.formatMessage({
              id: 'buttons.for-rent',
            }),
            intl.formatMessage({
              id: 'buttons.for-sale',
            }),
          ]}
          onSelect={setSelectedBtn}
          selectedOption={selectedBtn}
        />
        <TopSpace top={10} />

        <View style={styles.currentLocationView}>
          <LocationPinIcon fill={Colors.light.blue} width={20} height={20} />
          <Text style={styles.currentLocationText}>
            {/*  */}
            {intl.formatMessage({
              id: 'buttons.current-location',
            })}
            {/* Current Location */}
          </Text>
        </View>
        <TopSpace top={10} />

        {/* Search history starts */}
        <Text style={styles.headingTitleStyle}>
          {intl.formatMessage({
            id: 'explore-search.search-history',
          })}
        </Text>
        {/* Search history ends */}
        <FlatList
          data={[1, 2, 3, 4, 5]}
          contentContainerStyle={{marginVertical: 10}}
          renderItem={renderSearch}
        />
        {/* Suggested searches */}
        <Text style={styles.headingTitleStyle}>
          {intl.formatMessage({
            id: 'explore-search.suggested-search',
          })}
        </Text>

        <FlatList
          data={[1, 2, 3, 4, 5]}
          contentContainerStyle={{marginVertical: 10}}
          renderItem={renderSuggestedSearches}
        />
      </View>
    </Screen>
  );
};
