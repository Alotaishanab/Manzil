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
  const [loading, setLoading] = useState(true); // Track overall loading state

  // Check if the user is logged in (using AsyncHelper as you've done before)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncHelper.getToken();
      setIsLoggedin(!!token); // If token exists, set isLoggedin to true
      setLoading(false); // Stop loading once status is determined
    };
    checkLoginStatus();
  }, []);

  // Fetch profile data using the react-query hook
  const { data: profile, isLoading: isProfileLoading, isError } = useGetProfile(); // Use query hook to get profile data

  const toggleDeleteAccountModal = () => {
    setShowDeleteAccount(!showDeleteAccount);
  };

  const handleDeleteAccount = () => {
    toggleDeleteAccountModal();
  };

  const handleKeepAccount = () => {
    toggleDeleteAccountModal();
  };

  // Show a loader until the auth and profile status are fully determined
  if (loading || isProfileLoading) {
    return (
      <Screen padding={0} showKeyboardAware={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  // Show the logged-in page with profile data
  if (isLoggedin && profile && !isProfileLoading) {
    return (
      <Screen padding={0} showKeyboardAware={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LoggedinUserPage
            toggleDeleteAccountModal={toggleDeleteAccountModal}
            userData={profile} // Pass profile data to LoggedinUserPage
            isLoading={isProfileLoading} // Control skeleton loading
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

  // Handle case when profile data fails to load (user not logged in or API error)
  if (!isLoggedin || isError) {
    return (
      <Screen padding={0} showKeyboardAware={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DefaultPage />
        </ScrollView>
      </Screen>
    );
  }

  return null;
};
