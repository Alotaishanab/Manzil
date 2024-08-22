import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {VisaCardIcon} from '@svgs';

const HistoryCard = ({cardNumber}: any) => {
  return (
    <View style={styles.mainWrap}>
      <View style={{flex: 1}}>
        <Text style={styles.titleText}>Fasial </Text>
        <Text style={styles.cardNoText}>{cardNumber} </Text>
      </View>
      <VisaCardIcon width={25} height={25} />
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  mainWrap: {
    borderRadius: 6,
    backgroundColor: Colors.light.inputBg,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
  },
  cardNoText: {
    color: Colors.light.greyHeading,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
  },
});
