/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Screen, TopSpace} from '@components';
import {Image, Pressable, Text, View} from 'react-native';
import IconTitleButtonArrow from '../../../src/components/molecules/IconTitleButtonArrow';
import {useIntl} from '@context';
import FilterHeader from '../../../src/components/molecules/FilterHeader';
import {styles} from './styles';
import {building} from '@assets';

export const Home = () => {
  const {intl} = useIntl();
  return (
    <Screen showKeyboardAware={true}>
      <View>
        <FilterHeader />
      </View>

      <View style={{flexGrow: 1, paddingTop: 30}}>
        {/* <TopSpace top={30} /> */}
        <Text style={styles.headingText}>
          {intl.formatMessage({
            id: 'homeScreen.manzili',
          })}
        </Text>
        <TopSpace top={10} />
        <IconTitleButtonArrow
          iconName={'SavedIcon'}
          title={intl.formatMessage({
            id: 'homeScreen.saved-searches-alerts',
          })}
        />
        <TopSpace top={30} />
        <Text style={styles.headingText}>
          {intl.formatMessage({
            id: 'homeScreen.agent',
          })}
        </Text>
        <TopSpace top={10} />
        <IconTitleButtonArrow
          iconName={'SavedIcon'}
          title={intl.formatMessage({
            id: 'homeScreen.request-property-valudation',
          })}
        />
        <TopSpace top={30} />
        <Text style={styles.localExpertText}>
          {intl.formatMessage({
            id: 'homeScreen.local-expert',
          })}{' '}
          SW1,South West London
        </Text>

        <View style={styles.findOutMoreMainWrap}>
          <View style={{flex: 1.5, justifyContent: 'center'}}>
            <Text style={styles.findOutMoreMainTitle}>
              Newly restored Studio, 1, 2& 3+ Bed
            </Text>
            <Pressable style={styles.findOutMoreBtn}>
              <Text style={styles.findOutMoreText}>
                {intl.formatMessage({
                  id: 'buttons.find-out-more',
                })}
              </Text>
            </Pressable>
          </View>

          <View style={{flex: 1}}>
            <Image
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 4,
              }}
              source={building}
            />
          </View>
        </View>

        <TopSpace top={30} />
        <Text style={styles.headingText}>
          {intl.formatMessage({
            id: 'homeScreen.more-from-manzil',
          })}
        </Text>
        <TopSpace top={10} />
        <IconTitleButtonArrow
          rightIcon="MoreIcon"
          iconName={'SearchIcon'}
          title={intl.formatMessage({
            id: 'homeScreen.commercial-properties-for-sale',
          })}
        />
        <TopSpace top={10} />
        <IconTitleButtonArrow
          rightIcon="MoreIcon"
          iconName={'SearchIcon'}
          title={intl.formatMessage({
            id: 'homeScreen.commercial-properties-to-rent',
          })}
        />
        <TopSpace top={10} />
        <IconTitleButtonArrow
          rightIcon="MoreIcon"
          iconName={'BrightnessIcon'}
          title={intl.formatMessage({
            id: 'homeScreen.overseas-property-search',
          })}
        />
      </View>
    </Screen>
  );
};
