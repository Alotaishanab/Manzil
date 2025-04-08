// src/components/Account.tsx
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { GenericModal, Screen } from '@components';
import DefaultPage from './component/DefaultPage';
import LoggedinUserPage from './component/LoggedinUserPage';
import DeleteAccountContent from './component/DeleteAcountContent';
import { useGetProfile } from '@services';
import { AsyncHelper } from '../../helpers/asyncHelper';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '@colors';

export const Account = () => {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState<boolean>(false); // Track completion of auth check

  useFocusEffect(
    React.useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          // Retrieve the token using AsyncHelper
          const token = await AsyncHelper.getToken();
          setIsLoggedin(!!token); // If token exists, user is logged in
        } catch (error) {
          console.error('Error checking login status:', error);
          setIsLoggedin(false);
        } finally {
          setHasCheckedAuth(true); // Mark that the auth check is complete
        }
      };
      checkLoginStatus();
    }, [])
  );

  // Only fetch profile if the user is logged in
  const { data: profile, isError, isLoading: isProfileLoading } = useGetProfile({
    enabled: isLoggedin,
  });

  const toggleDeleteAccountModal = () => setShowDeleteAccount(prev => !prev);

  // While the auth check is still in progress, return null to avoid flicker
  if (!hasCheckedAuth) {
    return null;
  }

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
            isLoading={isProfileLoading}
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
      <Screen padding={0} showKeyboardAware={false} style={styles.centered}>
        <Text style={styles.errorText}>Error loading profile data.</Text>
      </Screen>
    );
  }

  return null;
};

export default Account;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 16,
    textAlign: 'center',
  },
});
