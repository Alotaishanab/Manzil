/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, View} from 'react-native';
import {HeaderBackButtonTitle, Screen, TopSpace} from '@components';
import {useIntl} from '@context';
import {Colors} from '@colors';
import {styles} from './styles';
import {ArrowDownIcon, ArrowUpIcon, UserLocationIcon} from '@svgs';
import {globalStyles} from '@globalStyles';
import PerformanceCard from './components/PerformanceCard';
import {FlatList} from 'react-native';
import {mapPiece} from '@assets';

export const Analytics = () => {
  const {intl} = useIntl();

  const data = [
    {
      id: 1,
      name: intl.formatMessage({id: 'analyticScreen.views'}),
      value: '1,200',
      icon: 'ViewsIcon',
      increase: true,
      percent: '9',
    },
    {
      id: 2,
      name: intl.formatMessage({id: 'analyticScreen.clicks'}),
      value: '480',
      icon: 'TouchIcon',
      increase: true,
      percent: '5',
    },
    {
      id: 3,
      name: intl.formatMessage({id: 'analyticScreen.shares'}),
      value: '900',
      icon: 'Share',
      increase: false,
      percent: '20',
    },
    {
      id: 4,
      name: intl.formatMessage({id: 'analyticScreen.time-spent'}),
      value: '1,200 mins',
      icon: 'TimerIcon',
      increase: true,
      percent: '9',
    },
    {
      id: 5,
      name: intl.formatMessage({id: 'analyticScreen.saves'}),
      value: '480',
      icon: 'HeartIcon',
      increase: true,
      percent: '5',
    },
    {
      id: 6,
      name: intl.formatMessage({id: 'analyticScreen.inquiries'}),
      value: '900',
      icon: 'InquiryIcon',
      increase: true,
      percent: '5',
    },
  ];

  const renderData = ({item}: any) => {
    return <PerformanceCard key={item?.id} item={item} />;
  };

  const userLocations = [
    {
      id: 1,
      name: 'Riyadh',
      increase: true,
      val: '60%',
    },
    {
      id: 2,
      name: 'Jeddash',
      increase: false,
      val: '20%',
    },
    {
      id: 3,
      name: 'Dammamm',
      increase: true,
      val: '20%',
    },
  ];

  const renderLocation = ({item}: any) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image style={styles.imageMapPiece} source={mapPiece} />
        <TopSpace top={10} />
        <Text style={styles.locationText}>{item?.name}</Text>
        <View style={globalStyles.simpleRow}>
          {item?.increase ? (
            <ArrowUpIcon width={20} height={20} />
          ) : (
            <ArrowDownIcon width={20} height={20} />
          )}
          <Text
            style={[
              styles.locationNamePercentage,
              {
                color: item?.increase
                  ? Colors.light.increaseArrow
                  : Colors.light.danger,
              },
            ]}>
            {item?.val}
          </Text>
        </View>
      </View>
    );
  };

  const ListFooter = () => {
    return (
      <>
        <View style={globalStyles.simpleRow}>
          <UserLocationIcon width={20} height={20} />
          {/*  */}
          <Text style={styles.userLocationText}>
            {intl.formatMessage({id: 'analyticScreen.user-location'})}
          </Text>
        </View>
        <TopSpace top={10} />

        <FlatList
          data={userLocations}
          renderItem={renderLocation}
          horizontal={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={3}
        />

        <TopSpace top={50} />
      </>
    );
  };
  const ListHeader = () => {
    return (
      <>
        <TopSpace top={20} />

        <Text style={styles.mainTitle}>
          {intl.formatMessage({id: 'analyticScreen.performance'})}
        </Text>

        <TopSpace top={10} />
      </>
    );
  };
  return (
    <Screen showKeyboardAware={false}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'analyticScreen.header'})}
      />

      <FlatList
        data={data}
        renderItem={renderData}
        contentContainerStyle={{marginTop: 2}}
        ListFooterComponent={ListFooter}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        ListFooterComponentStyle={{marginBottom: 100}}
        keyExtractor={item => item?.id?.toString()}
      />
    </Screen>
  );
};
