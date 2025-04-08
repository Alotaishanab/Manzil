import React from 'react';
import {HeaderBackButtonTitle, Screen, TopSpace} from '@components';
import {useIntl} from '@context';
import {Text} from 'react-native';
import {styles} from './styles';

export const PrivacyPolicy = () => {
  const {intl} = useIntl();
  return (
    <Screen showKeyboardAware={true}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'privacyPolicyScreen.header'})}
      />

      <TopSpace top={20} />
      <Text style={styles.title}>
        {intl.formatMessage({id: 'privacyPolicyScreen.consumer-privacy'})}
      </Text>

      <TopSpace top={10} />

      <Text style={styles.description}>
        {intl.formatMessage({id: 'privacyPolicyScreen.description'})}
      </Text>
      <TopSpace top={30} />

      <Text style={styles.title}>
        {intl.formatMessage({id: 'privacyPolicyScreen.who-we-are'})}
      </Text>
      <TopSpace top={10} />
      <Text style={styles.description}>
        {intl.formatMessage({id: 'privacyPolicyScreen.description'})}
      </Text>
    </Screen>
  );
};
