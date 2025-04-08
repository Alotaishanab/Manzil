import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import {HeaderBackButtonTitle, TopSpace} from '@components';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import TitleValueRow from './component/TitleValueRow';
import {logoAccount, logoAccount2} from '@assets';

export const Subscribed = () => {
  const {intl} = useIntl();
  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'accountScreen.loggedin.subscriptions'})}
      />

      <TopSpace top={20} />
      <View style={{flexGrow: 1}}>
        <Text style={styles.mainTitle}>
          {intl.formatMessage({id: 'subscriptionScreen.you-subscribed'})}
        </Text>
        <TopSpace top={10} />

        {/*  */}
        <TitleValueRow
          title={intl.formatMessage({id: 'subscriptionScreen.number-ads'})}
          value={'27'}
        />
        <TitleValueRow
          title={intl.formatMessage({
            id: 'subscriptionScreen.subscription-type',
          })}
          value={'Independent'}
        />
        <TitleValueRow
          title={intl.formatMessage({
            id: 'subscriptionScreen.subscription-starts',
          })}
          value={'2024/06/29'}
        />
        <TitleValueRow
          title={intl.formatMessage({
            id: 'subscriptionScreen.subscription-ends',
          })}
          value={'2024/06/29'}
        />
        {/*  */}
      </View>
      <Image style={styles.imgStyle} source={logoAccount2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: Colors.light.headingTitle,
  },
  title: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 13,
  },
  val: {
    color: Colors.light.greyHeading,
    fontFamily: fonts.primary.medium,
    fontSize: 13,
  },
  acknowledgeText: {
    textAlign: 'center',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    alignSelf: 'center',
    width: '70%',
  },
  imgStyle: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
  },
});
