import {house} from '@assets';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const HistoryCard = ({title, serialNo = '123123123', date, amount}: any) => {
  return (
    <View style={styles.cardMainRow}>
      <Image source={house} style={styles.cardImgStyle} />

      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text style={styles.cardTitle}>{title}</Text>

        <Text style={styles.dateNumberText}>#{serialNo}</Text>
      </View>

      <View style={{justifyContent: 'space-around'}}>
        <Text style={styles.dateNumberText}> 2024/06/29</Text>
        <Text style={styles.cardTitle}>500 Sar</Text>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  cardMainRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 6,
    marginBottom: 10,
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
