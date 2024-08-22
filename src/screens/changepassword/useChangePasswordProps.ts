import {useState} from 'react';

export const useChangePasswordProps = () => {
  const [hideCurrentPass, setHideCurrentPass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const toggleHideCurrentPass = () => {
    setHideCurrentPass(!hideCurrentPass);
  };

  const toggleHideNewPass = () => {
    setHideNewPass(!hideNewPass);
  };

  const toggleHideConfirmPass = () => {
    setHideConfirmPass(!hideConfirmPass);
  };

  return {
    toggleHideCurrentPass,
    toggleHideConfirmPass,
    toggleHideNewPass,
    hideCurrentPass,
    hideNewPass,
    hideConfirmPass,
  };
};
