import React, {useState} from 'react';
import {AddCardModal, HeaderBackButtonTitle, TopSpace} from '@components';
import {useIntl} from '@context';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {PlusIcon} from '@svgs';
import HistoryCard from './component/HistoryCard';
import {convertCardNumberToMaskDigit} from '@helpers';
import {useNavigation} from '@react-navigation/native';

export const PaymentMethods = () => {
  const {intl} = useIntl();
  const [showAddCard, setShowCard] = useState(false);
  const navigation: any = useNavigation();
  const toggleCard = () => {
    setShowCard(!showAddCard);
  };
  const handleAddMakePayment = () => {
    navigation.navigate('PaymentCardsConfirmation');
  };
  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'paymentMethodScreen.header'})}
      />
      <TopSpace top={20} />

      <HistoryCard
        cardNumber={convertCardNumberToMaskDigit('123123213123213')}
      />
      <HistoryCard
        cardNumber={convertCardNumberToMaskDigit('123123213123213')}
      />
      <TopSpace top={10} />

      <TouchableOpacity onPress={toggleCard} style={styles.rowBtn}>
        <PlusIcon fill={Colors.light.primaryBtn} width={20} height={20} />
        <Text style={styles.addNewText}>
          {/* */}
          {intl.formatMessage({id: 'buttons.add-new'})}
          {/* ADD NEW */}
        </Text>
      </TouchableOpacity>

      <AddCardModal
        isVisible={showAddCard}
        toggleVisible={toggleCard}
        handleAddMakePayment={handleAddMakePayment}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
