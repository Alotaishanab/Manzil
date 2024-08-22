/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Share from 'react-native-share';
import {Colors} from '@colors';

import {globalStyles} from '../../../../src/styles/globalStyles';
import {AreaIcon, BathroomIcon, BedIcon, HomeIcon} from '@svgs';
import {useIntl} from '@context';
import {TopSpace} from '@components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {styles} from '../styles';

const PriceSizeDetails = ({
  loading = true,
  propertiesFeatures,
  renderPropertyFeatures,
}: any) => {
  const {intl} = useIntl();

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 7,
          marginBottom: 10,
          paddingVertical: 10,
          borderRadius: 30,
        }}>
        <SkeletonPlaceholder backgroundColor={'#e0e0e0'} borderRadius={14}>
          <>
            <SkeletonPlaceholder.Item
              marginVertical={8}
              borderRadius={10}
              marginHorizontal={10}
              width={'60%'}
              marginTop={15}
              height={20}
            />

            <SkeletonPlaceholder.Item
              marginVertical={8}
              borderRadius={10}
              width={'50%'}
              marginHorizontal={10}
              height={20}
              backgroundColor={'#e0e0e0'}
            />
            <SkeletonPlaceholder.Item
              marginVertical={8}
              borderRadius={10}
              width={'90%'}
              marginHorizontal={10}
              height={20}
              backgroundColor={'#e0e0e0'}
            />

            <SkeletonPlaceholder.Item
              flexDirection="row"
              justifyContent="space-around"
              backgroundColor={'#e0e0e0'}
              marginVertical={8}>
              <SkeletonPlaceholder.Item
                width={60}
                height={60}
                backgroundColor={'#e0e0e0'}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                width={60}
                height={60}
                backgroundColor={'#e0e0e0'}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginTop={10}
              backgroundColor={'#e0e0e0'}
              justifyContent="space-around"
              marginVertical={8}>
              <SkeletonPlaceholder.Item
                width={60}
                height={60}
                backgroundColor={'#e0e0e0'}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                width={60}
                height={60}
                backgroundColor={'#e0e0e0'}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item
              marginVertical={8}
              borderRadius={10}
              marginHorizontal={10}
              width={'60%'}
              // marginTop={15}
              height={15}
              top={5}
            />
          </>
        </SkeletonPlaceholder>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.priceDetailContentView,
        {
          marginTop: 8,
          paddingHorizontal: 20,
        },
      ]}>
      <TopSpace top={15} />
      <Text style={styles.serialNoText}>
        {intl.formatMessage({id: 'landScreen.sr-no'})}
      </Text>

      <Text style={styles.guidePriceTitle}>
        {intl.formatMessage({id: 'landPropertyDetailScreen.guide-price'})}
      </Text>
      <TopSpace top={15} />

      <Text style={styles.addressText}>
        {intl.formatMessage({id: 'explore.riyadh-saudia'})}
      </Text>
      {/* <TopSpace top={15} /> */}
      <TopSpace top={20} />

      <View
        style={[
          globalStyles.simpleRow,
          {
            flex: 1,
          },
        ]}>
        <View style={{flex: 1}}>
          <Text
            style={[styles.guidePriceTitle, {color: Colors.light.greyHeading}]}>
            {intl.formatMessage({
              id: 'landPropertyDetailScreen.property-type',
            })}
          </Text>
          <View style={globalStyles.simpleRow}>
            <HomeIcon width={28} height={28} />
            <Text style={styles.headingText}>
              {intl.formatMessage({
                id: 'landPropertyDetailScreen.flat',
              })}
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text
            style={[styles.guidePriceTitle, {color: Colors.light.greyHeading}]}>
            {intl.formatMessage({
              id: 'landPropertyDetailScreen.bedroom',
            })}
          </Text>
          <View style={globalStyles.simpleRow}>
            <BedIcon width={33} height={33} />
            <Text style={styles.headingText}>2</Text>
          </View>
        </View>
      </View>
      <TopSpace top={20} />
      <View
        style={[
          globalStyles.simpleRow,
          {
            flex: 1,
          },
        ]}>
        {/* Bathroom   */}
        <View style={{flex: 1}}>
          <Text
            style={[styles.guidePriceTitle, {color: Colors.light.greyHeading}]}>
            {intl.formatMessage({
              id: 'landPropertyDetailScreen.bathrooms',
            })}
          </Text>
          <View style={globalStyles.simpleRow}>
            <BathroomIcon width={33} height={33} />
            <Text style={styles.headingText}>2</Text>
          </View>
        </View>
        {/* Size */}
        <View style={{flex: 1}}>
          <Text
            style={[styles.guidePriceTitle, {color: Colors.light.greyHeading}]}>
            {intl.formatMessage({
              id: 'landPropertyDetailScreen.size',
            })}
          </Text>
          <View style={globalStyles.simpleRow}>
            <AreaIcon width={30} height={30} />
            <Text style={styles.headingText}>814 sq ft</Text>
          </View>
        </View>
      </View>
      <TopSpace top={50} />

      <Text style={styles.reducedDate}>
        {intl.formatMessage({
          id: 'landPropertyDetailScreen.listed-on',
        })}{' '}
        21/02/2024
      </Text>

      <View style={priceStyles.line} />
      <TopSpace top={2} />
      <Text style={styles.propertiesFeatues}>
        {intl.formatMessage({
          id: 'addpropertyScreen.property-features',
        })}
      </Text>

      <FlatList
        data={propertiesFeatures}
        horizontal
        contentContainerStyle={{marginVertical: 10}}
        renderItem={renderPropertyFeatures}
      />
    </View>
  );
};

export default PriceSizeDetails;

const priceStyles = StyleSheet.create({
  line: {
    marginHorizontal: 20,
    borderWidth: 1,
    backgroundColor: Colors.light.darkLine,
    borderColor: Colors.light.darkLine,
    marginTop: 15,
  },
});
