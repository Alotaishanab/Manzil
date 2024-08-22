import React from 'react';
import {HeaderBackButtonTitle, TopSpace} from '@components';
import {useIntl} from '@context';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import HistoryCard from './components/HistoryCard';

export const PaymentHistory = () => {
  const {intl} = useIntl();
  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'paymentHistoryScreen.header'})}
      />

      <TopSpace top={20} />

      <HistoryCard
        title={intl.formatMessage({
          id: 'paymentHistoryScreen.property-listing',
        })}
      />
      <HistoryCard
        title={intl.formatMessage({
          id: 'paymentHistoryScreen.promotion',
        })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardMainRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 6,
  },
  cardImgStyle: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.medium,
  },
  dateNumberText: {
    color: Colors.light.subTitle,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
});
