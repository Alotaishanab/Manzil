/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '@globalStyles';
import {ag1, ag2, ag3, ag4, ag5} from '@assets';
import {
  CustomButton,
  GenericModal,
  HeaderBackButtonTitle,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {FlatList} from 'react-native';
import {Colors} from '@colors';
import {width} from '@useDimension';
import {fonts} from '@fonts';
import {useNavigation} from '@react-navigation/native';

export const AllAgencies = () => {
  const {intl} = useIntl();
  const navigation = useNavigation();

  const agencies = [
    {
      id: 1,
      img: ag1,
      name: intl.formatMessage({id: 'agencyScreen.paradise-jewel'}),
    },
    {
      id: 2,
      img: ag2,
      name: intl.formatMessage({id: 'agencyScreen.real-estate-income'}),
    },
    {
      id: 3,
      img: ag3,
      name: intl.formatMessage({id: 'agencyScreen.paradise-jewel'}),
    },
    {
      id: 4,
      img: ag4,
      name: intl.formatMessage({id: 'agencyScreen.paradise-jewel'}),
    },
    {
      id: 5,
      img: ag5,
      name: intl.formatMessage({id: 'agencyScreen.paradise-jewel'}),
    },
  ];

  const handleAgency = () => {
    navigation.navigate('AgencyDetails');
    //
  };

  const renderAllAgency = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={handleAgency}
        key={item?.id}
        style={styles.mainWrap}>
        <Image
          source={item?.img}
          resizeMode="stretch"
          style={styles.imageStyle}
        />
        <TopSpace top={10} />
        <Text style={styles.agencyName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.wrapScreen,
        {
          padding: 10,
        },
      ]}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'agencyScreen.header'})}
      />

      <FlatList
        keyExtractor={item => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        data={agencies}
        renderItem={renderAllAgency}
        // style={{marginHorizontal: 20}}
        contentContainerStyle={{marginHorizontal: 10}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainWrap: {
    marginTop: 10,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
    // borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    width: '92%',
    marginBottom: 2,
  },
  imageStyle: {
    height: 150,
    borderRadius: 25,
    width: '100%',
  },
  agencyName: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
    fontSize: 18,
  },
});
