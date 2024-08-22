import React, {useState} from 'react';
import {
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  AddCardModal,
  CustomButton,
  HeaderBackButtonTitle,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {Colors} from '@colors';
import {AppleIcon, card, PlusIcon} from '@assets';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import {useNavigation, useRoute} from '@react-navigation/native';

export const AddCards = () => {
  const {intl} = useIntl();
  const [showAddCard, setShowAddCard] = useState(false);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const type = route?.params?.type;
  const toggleCard = () => {
    setShowAddCard(!showAddCard);
  };
  const handlePayConfirm = () => {
    toggleCard();
  };

  const handleAddMakePayment = () => {
    toggleCard();
    if (type === 'pay') {
      navigation.navigate('Explore');
    } else {
      navigation.navigate('PaymentCardsConfirmation');
    }
  };
  return (
    <SafeAreaView style={[globalStyles.wrap, styles.mainWrap]}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'paymentScreen.payment'})}
      />
      <ScrollView contentContainerStyle={styles.innerWrap}>
        <View style={styles.cardWrap}>
          <TopSpace top={20} />
          <Image source={card} resizeMode="contain" style={styles.cardImg} />
          <TopSpace top={20} />
          <Text style={styles.noCardAddText}>
            {intl.formatMessage({id: 'paymentScreen.no-card-added'})}
          </Text>
          <TopSpace top={20} />

          <Text style={styles.saveLater}>
            {intl.formatMessage({id: 'paymentScreen.save-later'})}
          </Text>
          <TopSpace top={20} />
        </View>
        <TopSpace top={20} />

        <TouchableOpacity onPress={handlePayConfirm} style={styles.addCard}>
          <PlusIcon width={25} height={25} />
          <Text style={styles.addCardText}>
            {intl.formatMessage({id: 'paymentScreen.add-card'})}
          </Text>
        </TouchableOpacity>

        <TopSpace top={25} />

        <Pressable style={styles.payBtn}>
          <AppleIcon width={25} height={25} />
          <Text style={styles.payBtnText}>
            {/*  */}
            {intl.formatMessage({id: 'paymentScreen.pay'})}
          </Text>
        </Pressable>
        <TopSpace top={30} />

        <View style={globalStyles.simpleRow}>
          <Text style={styles.total}>
            {intl.formatMessage({id: 'paymentScreen.total'})?.toUpperCase()}:{' '}
          </Text>
          <Text style={styles.totalAmount}>750 SAR</Text>
        </View>
        <TopSpace top={20} />
        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={handlePayConfirm}
          title={intl
            .formatMessage({id: 'paymentScreen.pay-and-confirm'})
            ?.toUpperCase()}
          showRightIconButton={false}
        />
      </ScrollView>

      <AddCardModal
        isVisible={showAddCard}
        toggleVisible={toggleCard}
        handleAddMakePayment={handleAddMakePayment}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainWrap: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  innerWrap: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  cardWrap: {
    backgroundColor: Colors.light.inputBg,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    height: 300,
  },
  cardImg: {
    width: '58%',
    alignSelf: 'center',
    borderRadius: 10,
    height: '58%',
  },
  noCardAddText: {
    fontSize: 14,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
  },
  saveLater: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyHeading,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.light.inputBg,
  },
  addCardText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    marginLeft: 10,
  },
  payBtn: {
    padding: 10,
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  payBtnText: {
    fontSize: 30,
    marginLeft: 10,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
  },
  total: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  totalAmount: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 18,
  },
  modalFieldGreyTitle: {
    color: Colors.light.greyDescription,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  lgInput: {
    backgroundColor: Colors.light.inputBg,
    borderRadius: 20,
    height: 45,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  monthField: {
    paddingHorizontal: 20,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 30,
    height: 40,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  slash: {
    lineHeight: 40,
    fontSize: 30,
  },
});
