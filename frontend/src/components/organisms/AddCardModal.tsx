import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {CustomButton, TopSpace} from '../atoms';
import {GenericModal} from '../molecules';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';
import {VisaCardIcon} from '@svgs';

export const AddCardModal = ({
  isVisible,
  toggleVisible,
  handleAddMakePayment,
}: any) => {
  const {intl} = useIntl();
  return (
    <>
      <GenericModal
        isVisible={isVisible}
        centeredModal={false}
        showCloseButton={false}
        centerText={true}
        modalTitle={intl.formatMessage({id: 'paymentScreen.add-card'})}
        toggleModal={toggleVisible}>
        <>
          <TopSpace top={50} />
          <Text style={styles.modalFieldGreyTitle}>
            {intl
              .formatMessage({id: 'paymentScreen.card-holder-name'})
              ?.toUpperCase()}
          </Text>

          <View style={styles.lgInputWrap}>
            <TextInput placeholder="Faisal" style={styles.cardHolderInput} />
            <VisaCardIcon width={20} height={20} />
          </View>
          <TopSpace top={20} />

          <Text style={styles.modalFieldGreyTitle}>
            {intl
              .formatMessage({id: 'paymentScreen.card-number'})
              ?.toUpperCase()}
          </Text>
          <View style={styles.lgInputWrap}>
            <TextInput
              placeholder="4444 4444 4444 4444"
              keyboardType="number-pad"
              style={styles.cardHolderInput}
            />
            <VisaCardIcon width={20} height={20} />
          </View>
          <TopSpace top={30} />

          <View style={globalStyles.rowSpaceBetween}>
            <View>
              <Text
                style={[
                  styles.modalFieldGreyTitle,
                  {color: Colors.light.headingTitle},
                ]}>
                {intl
                  .formatMessage({id: 'paymentScreen.expiry-date'})
                  ?.toUpperCase()}
              </Text>
              <View style={globalStyles.simpleRow}>
                <TextInput
                  keyboardType="phone-pad"
                  // placeholder="MM"
                  placeholder={intl.formatMessage({id: 'paymentScreen.mm'})}
                  style={styles.monthField}
                />
                <Text style={styles.slash}> / </Text>
                <TextInput
                  keyboardType="phone-pad"
                  placeholder={intl.formatMessage({id: 'paymentScreen.yy'})}
                  style={styles.monthField}
                />
              </View>
            </View>

            <View>
              <Text
                style={[
                  styles.modalFieldGreyTitle,
                  {color: Colors.light.headingTitle},
                ]}>
                {intl
                  .formatMessage({id: 'paymentScreen.security-code'})
                  ?.toUpperCase()}
              </Text>
              <TextInput
                keyboardType="phone-pad"
                placeholder={intl.formatMessage({id: 'paymentScreen.cvc'})}
                style={styles.monthField}
              />
            </View>
          </View>
          <TopSpace top={50} />
          <CustomButton
            btnWidth={'100%'}
            disabled={false}
            borderRadius={30}
            handleClick={handleAddMakePayment}
            title={intl
              .formatMessage({id: 'paymentScreen.add-make-payment'})
              ?.toUpperCase()}
            showRightIconButton={false}
          />
          <TopSpace top={20} />
        </>
      </GenericModal>
    </>
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
  lgInputWrap: {
    backgroundColor: '#f4f6f8',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 20,
  },
  lgInput: {
    backgroundColor: '#f4f6f8',
    borderRadius: 20,
    height: 45,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  monthField: {
    paddingHorizontal: 20,
    backgroundColor: '#f4f6f8',
    borderRadius: 30,
    height: 40,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  slash: {
    lineHeight: 40,
    fontSize: 30,
  },
  cardHolderInput: {
    flex: 1,
    color: Colors.light.headingTitle,
    backgroundColor: '#f4f6f8',
    fontFamily: fonts.primary.regular,
  },
});
