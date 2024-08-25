import {showMessage} from 'react-native-flash-message';
import {CustomFlashMessage} from '@components';

export const showCustomFlashMessage = message => {
  showMessage({
    message: undefined,
    duration: 2000,
    backgroundColor: 'transparent',
    renderCustomContent: props => CustomFlashMessage({message}),
  });
};
