import React, {useState} from 'react';
import {AddCardModal, HeaderBackButtonTitle, TopSpace} from '@components';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {convertCardNumberToMaskDigit} from '@helpers';
import { HistoryCard } from '../paymentmethods/components/HistoryCard';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {PlusIcon} from '@svgs';
import {useNavigation} from '@react-navigation/native';

export const PaymentCardsConfirmation = () => {
  const {intl} = useIntl();
  const [showAddCard, setShowCard] = useState(false);
  const navigation: any = useNavigation();
  const toggleCard = () => {
    setShowCard(!showAddCard);
  };
  const handleAddMakePayment = () => {
    setShowCard(!showAddCard);
    navigation.navigate('PaymentHistory');
  };
  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'paymentScreen.payment'})}
      />

      <TopSpace top={20} />

      <HistoryCard
        cardNumber={convertCardNumberToMaskDigit('123123213123213')}
      />
      <HistoryCard
        cardNumber={convertCardNumberToMaskDigit('123123213123311')}
      />

      <TopSpace top={15} />
      <TouchableOpacity onPress={toggleCard} style={styles.rowBtn}>
        <PlusIcon fill={Colors.light.primaryBtn} width={20} height={20} />
        <Text style={styles.addNewText}>
          {intl.formatMessage({id: 'buttons.add-new'})}
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
