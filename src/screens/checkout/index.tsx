import React from 'react';
import {CustomButton, HeaderBackButtonTitle, TopSpace} from '@components';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import {useIntl} from '@context';
import {useNavigation, useRoute} from '@react-navigation/native';

export const Checkout = () => {
  const data = [1, 2];
  const route = useRoute();
  const type = route?.params?.type;
  const navigation: any = useNavigation();
  const {intl} = useIntl();
  const handleCard = () => {
    navigation.navigate('AddCards', {type: type});
  };
  const renderItems = ({item}: any) => {
    console.log('item:', item);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleCard}
        style={styles.row}>
        <Image
          source={{uri: 'https://picsum.photos/200/300'}}
          style={styles.imgStyle}
        />
        <View style={styles.mainLeftView}>
          {/*  */}
          <Text style={styles.name}>
            {intl.formatMessage({id: 'paymentHistoryScreen.property-listing'})}:
          </Text>
          <Text style={styles.amount}>250 SAR</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[globalStyles.wrap, {paddingHorizontal: 20, paddingTop: 20}]}>
      <HeaderBackButtonTitle text={''} />
      <TouchableOpacity style={{alignSelf: 'flex-end'}}>
        {/*  */}
        <Text style={styles.editItemText}>
          {intl.formatMessage({id: 'paymentScreen.edit-item'})?.toUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={renderItems}
          //   contentContainerStyle={{height: height / 2}}
        />
      </View>

      <View style={styles.bottomRoundWrap}>
        <Text style={styles.placeOrder}>Place your order</Text>
        <TopSpace top={15} />
        <Text style={styles.promoCode}>Promo Code</Text>
        <TextInput placeholder="Promo " style={styles.promoInput} />
        <TopSpace top={15} />
        <Text style={styles.promoCode}>Total: 750 SAR</Text>

        <TopSpace top={25} />
        <CustomButton
          btnWidth={'100%'}
          disabled={false}
          borderRadius={30}
          handleClick={handleCard}
          title={intl.formatMessage({id: 'buttons.next'})}
          showRightIconButton={false}
        />
        <TopSpace top={25} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editItemText: {
    color: Colors.light.greyDescription,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
  },
  row: {flexDirection: 'row', marginBottom: 15},
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  mainLeftView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 16,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
  },
  amount: {
    fontSize: 14,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
  },
  bottomRoundWrap: {
    // flex: 0.5,
    // flex: 1,
    // height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.light.inputBg,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  placeOrder: {
    textAlign: 'center',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
  },
  promoCode: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  promoInput: {
    backgroundColor: Colors.light.background,
    borderRadius: 25,
    height: 45,
    lineHeight: 35,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    alignItems: 'center',
  },
});
