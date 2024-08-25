/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {HeaderBackButtonTitle, PropertyCard, TopSpace} from '@components';
import {useIntl} from '@context';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '@globalStyles';
import {Text} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {manzil} from '@assets';

export const PropertiesRequestStatus = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const [orderStatus, setOrderStatus] = useState<any>(
    intl.formatMessage({id: 'requestStatus.ongoing'}),
  );
  const handleCard = () => {
    navigation.navigate('ExploreProperty');
  };

  useEffect(() => {
    setTimeout(() => {
      setOrderStatus(intl.formatMessage({id: 'requestStatus.complete'}));
    }, 2000);
  }, []);
  console.log('orderStatus', orderStatus);
  return (
    <SafeAreaView style={[globalStyles.wrapScreen, {}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <HeaderBackButtonTitle text={''} />
        <TopSpace top={20} />

        <Text style={styles.title}>
          {intl.formatMessage({id: 'requestStatus.request-recieved'})}
        </Text>
        <TopSpace top={15} />

        <View style={globalStyles.simpleRow}>
          <View style={{flex: 1}}>
            <Pressable
              onPress={() => {
                navigation.navigate('RequestList');
              }}>
              <Text style={styles.status}>
                {intl.formatMessage({id: 'requestStatus.order-status'})}
              </Text>
            </Pressable>

            <TopSpace top={20} />
            <View style={styles.progressLine} />
          </View>

          <View style={{marginLeft: 20, flex: 1}}>
            {orderStatus ===
            intl.formatMessage({id: 'requestStatus.ongoing'}) ? (
              <Text style={styles.status}>
                {intl.formatMessage({id: 'requestStatus.ongoing'})}
              </Text>
            ) : (
              <Text style={styles.status}>
                {intl.formatMessage({id: 'requestStatus.complete'})}
              </Text>
            )}
            <TopSpace top={20} />
            {orderStatus !==
              intl.formatMessage({id: 'requestStatus.ongoing'}) && (
              <View style={styles.progressLine} />
            )}
          </View>
        </View>

        {orderStatus !== intl.formatMessage({id: 'requestStatus.ongoing'}) && (
          <>
            <Text style={styles.status}>
              {intl.formatMessage({id: 'requestStatus.received-properties'})}
            </Text>
            <TopSpace top={10} />

            <View style={{overflow: 'hidden'}}>
              <PropertyCard handleClick={handleCard} />
            </View>
          </>
        )}

        {orderStatus === intl.formatMessage({id: 'requestStatus.ongoing'}) && (
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Image source={manzil} style={styles.img} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.secondary.bold,
    fontSize: 24,
  },
  status: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 30,
    paddingHorizontal: 1,
  },
  progressLine: {
    backgroundColor: Colors.light.grey,
    height: 20,
  },
  img: {
    width: 350,
    alignSelf: 'center',
    height: 350,
  },
});
