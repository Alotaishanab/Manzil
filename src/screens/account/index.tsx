import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { GenericModal, Screen } from '@components';
import DefaultPage from './component/DefaultPage';
import LoggedinUserPage from './component/LoggedinUserPage';
import { AsyncHelper } from '../../../src/helpers/asyncHelper'; // Adjust the path
import DeleteAccountContent from './component/DeleteAcountContent';
import { useGetProfile } from '@services'; // Import the profile query hook

export const Account = () => {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if the user is logged in (using AsyncHelper as you've done before)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncHelper.getToken();
      setIsLoggedin(!!token); // If token exists, set isLoggedin to true
      setIsLoading(false); // Set loading to false once we know the login status
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

  // Show the logged-in page with profile data
  if (isLoggedin) {
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
