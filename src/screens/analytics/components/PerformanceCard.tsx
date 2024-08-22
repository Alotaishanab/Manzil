import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {ArrowUpIcon, ArrowDownIcon} from '@svgs';
import * as SVGs from '../../../assets/svgs';

import {globalStyles} from '@globalStyles';

const PerformanceCard = ({item}: any) => {
  console.log(item);

  const TitleIcon = SVGs[item.icon];
  // const TitleIcon = SVGs.TouchIcon;
  console.log('TitleIcon', TitleIcon);
  return (
    <View style={styles.mainCardWrapper}>
      <TitleIcon width={30} height={30} />
      <View style={styles.mainTitleValueView}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.value}>{item?.value}</Text>
      </View>

      <View style={styles.center}>
        <View style={globalStyles.simpleRow}>
          {item?.increase ? (
            <ArrowUpIcon width={20} height={20} />
          ) : (
            <ArrowDownIcon width={20} height={20} />
          )}
          <Text
            style={[
              styles.increaseDecreaseText,
              {
                color: item?.increase
                  ? Colors.light.increaseArrow
                  : Colors.light.danger,
              },
            ]}>
            9%
          </Text>
        </View>
        <Text style={styles.daysText}>In last 7 days</Text>
      </View>
    </View>
  );
};
export default PerformanceCard;

const styles = StyleSheet.create({
  mainCardWrapper: {
    backgroundColor: Colors.light.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
    marginHorizontal: 2,
  },
  mainTitleValueView: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    color: Colors.light.greyHeading,
    fontSize: 15,
    fontFamily: fonts.primary.regular,
  },
  value: {
    color: Colors.light.headingTitle,
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  daysText: {
    color: Colors.light.greyHeading,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
  increaseDecreaseText: {
    color: Colors.light.increaseArrow,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
  center: {
    alignItems: 'center',
  },
});
