import {showMessage} from 'react-native-flash-message';
import {CustomFlashMessage} from '@components';

export const showCustomFlashMessage = (message: string) => {
  showMessage({
    message: '',
    duration: 2000,
    backgroundColor: 'transparent',
    renderCustomContent: props => CustomFlashMessage({message}),
  });
};
