import { showMessage } from 'react-native-flash-message';
import { CustomFlashMessage } from '@components'; // Adjust the import path as per your file structure

export const showCustomFlashMessage = (message: string) => {
  showMessage({
    message: '',
    duration: 3000, // Set the message duration
    backgroundColor: 'transparent', // Transparent background since the message container will render the design
    renderCustomContent: () => {
      return <CustomFlashMessage message={message} />;
    },
  });
};
