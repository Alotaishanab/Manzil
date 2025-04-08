import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  CustomButton,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import {globalStyles} from '@globalStyles';
import {Checkbox} from 'react-native-paper';

export const DeleteAccount = () => {
  const {intl} = useIntl();
  const [checked, setChecked] = useState(false);

  const handleDeleteAccount = () => {};
  const handleKeepAccount = () => {};
  return (
    <Screen showKeyboardAware={true}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'accountScreen.loggedin.delete-account'})}
      />

      <TopSpace top={20} />
      <Text style={styles.title}>
        {intl.formatMessage({
          id: 'accountScreen.loggedin.delete-account.sure-message',
        })}
      </Text>

      <TopSpace top={10} />
      <Text style={styles.emailText}>asdas@gmail.com</Text>
      <TopSpace top={10} />
      <Text style={styles.descriptionText}>
        {intl.formatMessage({
          id: 'accountScreen.loggedin.delete-account.description',
        })}
      </Text>
      <TopSpace top={10} />
      <View style={globalStyles.flexRow}>
        <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
          rippleColor={Colors.light.headingTitle}
          uncheckedColor={Colors.light.headingTitle}
        />
        <Text
          style={[
            styles.descriptionText,
            {
              width: '75%',
            },
          ]}>
          {intl.formatMessage({
            id: 'accountScreen.loggedin.delete-account.check-message',
          })}
        </Text>
      </View>
      <TopSpace top={10} />
      <Text style={styles.userDataText}>
        {intl.formatMessage({
          id: 'accountScreen.loggedin.delete-account.user-data',
        })}
      </Text>
      <TopSpace top={20} />
      <CustomButton
        borderRadius={30}
        btnBg={Colors.light.inputBg}
        textColor={Colors.light.headingTitle}
        btnWidth={'100%'}
        disabled={false}
        handleClick={handleDeleteAccount}
        title={intl.formatMessage({id: 'buttons.delete-account'})}
        showRightIconButton={false}
      />
      <TopSpace top={20} />
      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleKeepAccount}
        title={intl.formatMessage({id: 'buttons.keep-account'})}
        showRightIconButton={false}
      />
      <TopSpace top={20} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
  },
  emailText: {
    color: Colors.light.blueText,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
  },
  descriptionText: {
    color: Colors.light.headingTitle,
    opacity: 0.6,
    fontSize: 13,
    fontFamily: fonts.primary.regular,
  },
  userDataText: {
    color: Colors.light.orText,
    fontSize: 13,
    fontFamily: fonts.primary.regular,
  },
});
