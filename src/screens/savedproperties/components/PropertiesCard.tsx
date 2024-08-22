/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../../../assets/fonts';
import {Colors} from '@colors';
import {useIntl} from '@context';
import {TopSpace} from '@components';
import {globalStyles} from '../../../../src/styles/globalStyles';
import {BedIcon, FavoriteIcon} from '@svgs';
import {useNavigation} from '@react-navigation/native';

const PropertiesCard = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const handleCard = () => {
    navigation.navigate('LandPropertyDetails');
  };
  return (
    <TouchableOpacity onPress={handleCard} style={styles.cardWrapper}>
      <Image
        source={{
          uri: 'https://fastly.picsum.photos/id/66/3264/2448.jpg?hmac=H9yvGug9-Lk5f-1qZqs6dEV-Yd40jFOIC7oudo4eBK4',
        }}
        style={styles.imgStyle}
      />
      <View style={styles.dateView}>
        <Text style={styles.dateText}>
          {intl.formatMessage({
            id: 'savedPropertyScreen.added-on',
          })}
          {/* savedPropertyScreen.added */}
          12/05/2023
        </Text>

        <Text
          style={{
            color: Colors.light.headingTitle,
            fontFamily: fonts.primary.bold,
            fontSize: 18,
          }}>
          E1,625 pcm
        </Text>

        <Text
          style={{
            color: Colors.light.grey,
            fontFamily: fonts.primary.regular,
            fontSize: 10,
          }}>
          E1,625 pw
        </Text>

        <TopSpace top={20} />
        <View style={globalStyles.simpleRow}>
          <Text style={styles.bedText}>Flat 1{'  '}</Text>
          <BedIcon width={35} height={35} />
        </View>
        <View
          style={[
            globalStyles.simpleRow,
            {
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            },
          ]}>
          <Text style={styles.addressText}>Mighel Street,BN2</Text>

          <View style={styles.yellowBox}>
            <Text style={styles.yelloBoxText}>savill</Text>
          </View>
        </View>

        <TopSpace top={30} />

        <Pressable style={styles.favoriteBtnStyle}>
          <FavoriteIcon fill={Colors.light.danger} width={30} height={30} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default PropertiesCard;

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 15,
    paddingBottom: 10,
    // borderBottomLeftRadius: 5,
    borderRadius: 10,
    // borderBottomRightRadius: 5,
    shadowColor: '#000',
    backgroundColor: Colors.light.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgStyle: {
    borderRadius: 10,
    height: 270,
    alignItems: 'flex-end',
    padding: 5,
  },
  bedText: {
    color: Colors.light.black,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  dateView: {paddingVertical: 10, paddingHorizontal: 10},
  dateText: {
    textAlign: 'right',
    fontSize: 11,
    right: 15,
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
  },
  addressText: {
    color: Colors.light.black,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  yellowBox: {
    backgroundColor: Colors.light.yellow,
    borderRadius: 4,
    marginRight: 5,
    padding: 10,
  },
  yelloBoxText: {
    fontSize: 10,
    color: Colors.light.danger,
    fontFamily: fonts.primary.regular,
  },
  favoriteBtnStyle: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});
