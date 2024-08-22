import React, {useState} from 'react';
import {Screen} from '@components';
import {View} from 'react-native';
import {Colors} from '@colors';
import UnauthorizedContent from './components/UnauthorizedContent';
import AuthorizedContent from './components/AuthorizedContent';
import {useIntl} from '@context';

export const SavedProperties = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const {intl} = useIntl();
  const sort: any = [
    {
      label: intl.formatMessage({
        id: 'savedPropertyScreen.newest-date-saved',
      }),
      value: '1',
    },
    {
      label: intl.formatMessage({
        id: 'savedPropertyScreen.oldest-date-saved',
      }),
      value: '2',
    },
  ];
  return (
    <Screen padding={0} showKeyboardAware={!isLoggedin ? true : false}>
      <View
        style={{
          backgroundColor: Colors.light.secondaryBackground,
        }}>
        {!isLoggedin && <UnauthorizedContent setIsLoggedin={setIsLoggedin} />}
        {isLoggedin && <AuthorizedContent sortList={sort} />}
      </View>
    </Screen>
  );
};
