import React, { useState, useEffect } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { GenericModal, Screen } from '@components';
import DefaultPage from './component/DefaultPage';
import LoggedinUserPage from './component/LoggedinUserPage';
import { AsyncHelper } from '../../../src/helpers/asyncHelper'; // Adjust the path
import DeleteAccountContent from './component/DeleteAcountContent';
import { useGetProfile } from '@services'; // Import the profile query hook
import { Colors } from '@colors';

export const Account = () => {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState<boolean | null>(null); // Start as null to indicate "checking"

  // Check if the user is logged in
  useEffect(() => {
    let isMounted = true;
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncHelper.getToken();
        if (isMounted) {
          setIsLoggedin(!!token); // If token exists, set isLoggedin to true
        }
      } catch (error) {
        console.error('Error getting token:', error);
        if (isMounted) {
          setIsLoggedin(false);
        }
      }
    };
    checkLoginStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch profile data using the react-query hook, only when user is logged in
  const { data: profile, isLoading: isProfileLoading, isError } = useGetProfile({
    enabled: isLoggedin === true,
  });

  const toggleDeleteAccountModal = () => {
    setShowDeleteAccount(!showDeleteAccount);
  };

  const handleDeleteAccount = () => {
    toggleDeleteAccountModal();
  };

  const handleKeepAccount = () => {
    toggleDeleteAccountModal();
  };

  // Show loader only while checking login status
  if (isLoggedin === null) {
    // Still checking login status
    return (
      <Screen padding={0} showKeyboardAware={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  if (isLoggedin === false) {
    // User is not logged in
    return (
      <Screen padding={0} showKeyboardAware={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DefaultPage />
        </ScrollView>
      </Screen>
    );
  }

  if (isLoggedin === true) {
    // User is logged in
    if (isProfileLoading) {
      return (
        <Screen padding={0} showKeyboardAware={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        </Screen>
      );
    }

    if (profile) {
      return (
        <Screen padding={0} showKeyboardAware={false}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <LoggedinUserPage
              toggleDeleteAccountModal={toggleDeleteAccountModal}
              userData={profile}
              isLoading={isProfileLoading}
            />
          </ScrollView>
          <GenericModal
            isVisible={showDeleteAccount}
            modalTitle={''}
            toggleModal={toggleDeleteAccountModal}
          >
            <DeleteAccountContent
              checked={checked}
              setChecked={setChecked}
              handleDeleteAccount={handleDeleteAccount}
              handleKeepAccount={handleKeepAccount}
            />
          </GenericModal>
        </Screen>
      );
    }

    if (isError) {
      // Handle error fetching profile
      return (
        <Screen padding={0} showKeyboardAware={false}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Show an error message or fallback UI */}
            <DefaultPage />
          </ScrollView>
        </Screen>
      );
    }
  }

  return null;
};
