/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HeaderBackButtonTitle, TopSpace} from '@components';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {useIntl} from '@context';
import {fonts} from '@fonts';
import {PlusIcon} from '@svgs';
import {useNavigation} from '@react-navigation/native';

export const RequestList = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={[globalStyles.wrapScreen, {}]}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'buttons.requests'})}
      />
      <TopSpace top={30} />

      <TouchableOpacity style={styles.cardWrap}>
        <View style={globalStyles.rowSpaceBetween}>
          <Text style={styles.location}>Riyadh, AlMalya</Text>
          <Text style={styles.date}>2024/06/29</Text>
        </View>
        <TopSpace top={5} />

        <View style={globalStyles.rowSpaceBetween}>
          <Text
            style={[
              styles.date,
              {
                fontFamily: fonts.secondary.regular,
              },
            ]}>
            {intl.formatMessage({id: 'landPropertyDetailScreen.land'})}
          </Text>
          <Text
            style={[
              styles.date,
              {
                color: Colors.light.description,
                fontFamily: fonts.primary.medium,
                fontSize: 18,
              },
            ]}>
            3000 Sar-500 Sar
          </Text>
        </View>

        <Text
          style={[
            styles.date,
            {
              textAlign: 'right',
            },
          ]}>
          Complete
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardWrap}>
        <View style={globalStyles.rowSpaceBetween}>
          <Text style={styles.location}>Riyadh, AlMalya</Text>
          <Text style={styles.date}>2024/06/29</Text>
        </View>
        <TopSpace top={5} />

        <View style={globalStyles.rowSpaceBetween}>
          <Text
            style={[
              styles.date,
              {
                fontFamily: fonts.secondary.regular,
              },
            ]}>
            {intl.formatMessage({
              id: 'requestPropertyScreen.properties-type.appartment',
            })}
          </Text>
          <Text
            style={[
              styles.date,
              {
                color: Colors.light.description,
                fontFamily: fonts.primary.medium,
                fontSize: 18,
              },
            ]}>
            3000 Sar-500 Sar
          </Text>
        </View>

        <Text
          style={[
            styles.date,
            {
              textAlign: 'right',
            },
          ]}>
          Complete
        </Text>
      </TouchableOpacity>
      <TopSpace top={60} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RequestProperty');
        }}
        style={styles.rowBtn}>
        <PlusIcon fill={Colors.light.primaryBtn} width={20} height={20} />
        <Text style={styles.addNewText}>
          {intl.formatMessage({id: 'buttons.add-new'})}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardWrap: {
    backgroundColor: Colors.light.inputBg,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  location: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.secondary.bold,
    fontSize: 16,
  },
  date: {
    color: Colors.light.subTitle,
    fontFamily: fonts.secondary.regular,
    fontSize: 14,
  },
  rowBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addNewText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.semiBold,
    fontSize: 16,
    left: 10,
  },
});
