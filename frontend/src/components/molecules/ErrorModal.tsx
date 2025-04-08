import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '@colors';
import { GenericModal } from './GenericModal';

interface ErrorModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isVisible,
  onClose,
  message,
}) => {
  return (
    <GenericModal
      isVisible={isVisible}
      toggleModal={onClose}
      modalTitle="Error"
      centeredModal={true}
      showCloseButton={true}>
      <Text style={styles.errorText}>{message}</Text>
    </GenericModal>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ErrorModal;
