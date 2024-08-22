/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  HeaderBackButtonTitle,
  PropertyCard,
  TabButtons,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';
import {FlatList, Platform, SafeAreaView, View} from 'react-native';

export const ListedProperties = () => {
  const {intl} = useIntl();
  const [selectedBtn, setSelectedBtn] = React.useState(
    intl.formatMessage({
      id: 'listedPropertyScreen.all',
    }),
  );
  const data: any = [
    {
      id: 1,
      featured: true,
    },
    {
      id: 2,
      featured: false,
    },
    {
      id: 3,
      featured: true,
    },
    {
      id: 4,
      featured: true,
    },
    {
      id: 5,
      featured: true,
    },
    {
      id: 6,
      featured: false,
    },
    {
      id: 7,
      featured: false,
    },
    {
      id: 8,
      featured: true,
    },
    {
      id: 9,
      featured: false,
    },
  ];
  const renderListedProperty = ({item}: any) => {
    return <PropertyCard item={item} />;
  };
  // const renderListedProperty = ({item}) => {
  //   return <ListedPropertyCard item={item} />;
  // };
  return (
    <SafeAreaView
      style={[
        globalStyles.wrapScreen,
        {
          paddingHorizontal: 20,
        },
      ]}>
      <View
        style={{
          flexGrow: 1,
          paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'listedPropertyScreen.header'})}
        />
        <TopSpace top={10} />
        <TabButtons
          options={[
            intl.formatMessage({
              id: 'listedPropertyScreen.featured',
            }),
            intl.formatMessage({
              id: 'listedPropertyScreen.not-featured',
            }),
            intl.formatMessage({
              id: 'listedPropertyScreen.all',
            }),
          ]}
          onSelect={setSelectedBtn}
          borderRadius={20}
          paddingVertical={10}
          selectedOption={selectedBtn}
        />
        <TopSpace top={5} />

        <FlatList
          data={data}
          renderItem={renderListedProperty}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 5}}
          keyExtractor={item => item?.id?.toString()}
          ListFooterComponentStyle={{marginBottom: 50}}
          ListFooterComponent={() => <View style={{marginBottom: 50}} />}
        />
      </View>
    </SafeAreaView>
  );
};
