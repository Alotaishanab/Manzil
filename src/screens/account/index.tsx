import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {GenericModal, Screen} from '@components';
import DefaultPage from './component/DefaultPage';
import LoggedinUserPage from './component/LoggedinUserPage';
import DeleteAccountContent from './component/DeleteAcountContent';

export const Account = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoggedin(true);
    }, 4000);
  }, []);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const toggleDeleteAccountModal = () => {
    setShowDeleteAccount(!showDeleteAccount);
  };

  const handleDeleteAccount = () => {
    toggleDeleteAccountModal();
  };
  const handleKeepAccount = () => {
    toggleDeleteAccountModal();
  };
  return (
    <Screen padding={0} showKeyboardAware={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isLoggedin ? (
          <DefaultPage />
        ) : (
          <LoggedinUserPage
            toggleDeleteAccountModal={toggleDeleteAccountModal}
          />
        )}
      </ScrollView>
      <GenericModal
        isVisible={showDeleteAccount}
        modalTitle={''}
        toggleModal={toggleDeleteAccountModal}>
        <DeleteAccountContent
          checked={checked}
          setChecked={setChecked}
          handleDeleteAccount={handleDeleteAccount}
          handleKeepAccount={handleKeepAccount}
        />
      </GenericModal>
    </Screen>
  );
};
