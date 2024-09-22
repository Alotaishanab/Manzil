import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';

export interface ChangeUserPasswordResponse {
  message: string;
}

export interface ChangeUserPasswordRequest {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}

const changePassword = async (data: ChangeUserPasswordRequest) => {
  try {
    await api.post<ChangeUserPasswordResponse>(
      apiUrls.changeUserPassword,
      data,
    );
    return undefined;
  } catch (err) {
    console.log('Error changing password', err);
    throw err;
  }
};

export const useChangeUserPassword = () => {
  return useMutation<undefined, Error, ChangeUserPasswordRequest>({
    mutationFn: changePassword,
  });
};
