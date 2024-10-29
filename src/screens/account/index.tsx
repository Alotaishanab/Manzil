import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GenericModal, Screen } from '@components';
import DefaultPage from './component/DefaultPage';
import LoggedinUserPage from './component/LoggedinUserPage';
import { AsyncHelper } from '../../../src/helpers/asyncHelper';
import DeleteAccountContent from './component/DeleteAcountContent';
import { useGetProfile } from '@services';

export const Account = () => {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncHelper.getToken();
      setIsLoggedin(!!token); // True if token exists, else false (guest)
    };
    checkLoginStatus();
  }, []);

  // Only attempt to fetch profile if the user is logged in
  const { data: profile, isError } = useGetProfile({
    enabled: isLoggedin && !!AsyncHelper.getToken(),
  });

  const toggleDeleteAccountModal = () => setShowDeleteAccount(!showDeleteAccount);

  if (!isLoggedin) {
    return (
      <Screen padding={0} showKeyboardAware={false}>
        <DefaultPage />
      </Screen>
    );
  }

  if (isLoggedin && profile) {
    return (
      <Screen padding={0} showKeyboardAware={false}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <LoggedinUserPage
            toggleDeleteAccountModal={toggleDeleteAccountModal}
            userData={profile}
          />
          <GenericModal
            isVisible={showDeleteAccount}
            modalTitle={''}
            toggleModal={toggleDeleteAccountModal}
          >
            <DeleteAccountContent
              checked={checked}
              setChecked={setChecked}
              handleDeleteAccount={toggleDeleteAccountModal}
            />
          </GenericModal>
        </ScrollView>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen padding={0} showKeyboardAware={false}>
        <Text>Error loading profile data.</Text>
      </Screen>
    );
  }

  return null;
};
