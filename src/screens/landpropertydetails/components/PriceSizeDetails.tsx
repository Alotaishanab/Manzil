/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import Share from 'react-native-share';
import {Colors} from '@colors';
import {styles} from '../styles';
import {globalStyles} from '../../../../src/styles/globalStyles';
import {AreaIcon, LandIcon, LocationPinIcon} from '@svgs';
import {useIntl} from '@context';
import {TopSpace} from '@components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PriceSizeDetails = ({loading = true}) => {
  const {intl} = useIntl();

  const handleShare = () => {
    const options = {
      title: 'Here is title',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 15,
          marginBottom: 10,
          borderRadius: 14,
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

            <TopSpace top={20} />
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
              marginTop={15}
              height={20}
              top={15}
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
          marginTop: 15,
          paddingHorizontal: 20,
        },
      ]}>
      <TopSpace top={15} />
      <Text style={styles.serialNoText}>
        {intl.formatMessage({id: 'landPropertyDetailScreen.riyal-price'})}
      </Text>

      <Text style={styles.guidePriceTitle}>
        {intl.formatMessage({id: 'landPropertyDetailScreen.guide-price'})}
      </Text>
      <TopSpace top={15} />

      <Text style={styles.addressText}>
        {intl.formatMessage({id: 'explore.riyadh-saudia'})}
        {/* Riyadh 13524, Saudi Arabia */}
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
            <LandIcon width={28} height={28} />
            <Text style={styles.headingText}>
              {intl.formatMessage({
                id: 'landPropertyDetailScreen.land',
              })}
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text
            style={[styles.guidePriceTitle, {color: Colors.light.greyHeading}]}>
            {intl.formatMessage({
              id: 'landPropertyDetailScreen.direction',
            })}
          </Text>
          <View style={globalStyles.simpleRow}>
            <LocationPinIcon width={25} height={25} />
            <Text style={styles.headingText}>north</Text>
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
        {/* Price per meter */}
        <View style={{flex: 1}}>
          <Text
            style={[styles.guidePriceTitle, {color: Colors.light.greyHeading}]}>
            {intl.formatMessage({
              id: 'landPropertyDetailScreen.price-one-meter',
            })}
          </Text>
          <View style={globalStyles.simpleRow}>
            <LandIcon width={28} height={28} />
            <Text style={styles.headingText}>
              1800
              {intl.formatMessage({id: 'landPropertyDetailScreen.riyals'})}
            </Text>
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
            <AreaIcon width={25} height={25} />
            <Text style={styles.headingText}>129,800m²</Text>
          </View>
        </View>
      </View>
      <TopSpace top={50} />

      <Text style={styles.reducedDate}>
        {intl.formatMessage({
          id: 'landPropertyDetailScreen.listed-on',
        })}
        21/02/2024
      </Text>
    </View>
  );
};

export default PriceSizeDetails;
