import React, {useState} from 'react';
import {HeaderBackButtonTitle, Screen, TopSpace} from '@components';
import {Text} from 'react-native';
import {useIntl} from '@context';
import TitleDescriptionToggle from './components/TitleDescriptionToggle';

export const Notifications = () => {
  const {intl} = useIntl();
  const [toggleEmail, setToggleEmail] = useState(true);
  const [toggleSms, setToggleSms] = useState(false);
  return (
    <Screen showKeyboardAware={true}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'notificationScreen.header'})}
      />
      <TopSpace top={10} />
      <TitleDescriptionToggle
        title={intl.formatMessage({id: 'notificationScreen.email'})}
        description={intl.formatMessage({
          id: 'notificationScreen.emailDescription',
        })}
        setToggle={setToggleEmail}
        toggle={toggleEmail}
      />

      <TopSpace top={30} />

      <TitleDescriptionToggle
        title={intl.formatMessage({id: 'notificationScreen.sms'})}
        description={intl.formatMessage({
          id: 'notificationScreen.smsDescription',
        })}
        setToggle={setToggleSms}
        toggle={toggleSms}
      />
    </Screen>
  );
};
