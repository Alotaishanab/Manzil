import {useMutation} from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';


export interface ResetPasswordResponse {
  message: string
}
export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
}

const resetUserPassword = async (data: ResetPasswordRequest) => {
   await api.post<ResetPasswordResponse>(apiUrls.resetUserPassword, data);
  return undefined;
};

export const useResetUserPassword = () => {
  return useMutation<undefined, Error, ResetPasswordRequest>({
    mutationFn: resetUserPassword,
  });
};
