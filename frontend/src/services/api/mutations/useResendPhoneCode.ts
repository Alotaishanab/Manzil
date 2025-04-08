import {useMutation} from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';

export interface ResendPhoneCodeResponse {
  message: string;
}

const registerUserPhone = async () => {
  try {
    const data = await api.post<ResendPhoneCodeResponse>(
      apiUrls.resendPhoneCode,
      undefined,
    );

    return data;
  } catch (error) {
    console.log('Error registering phone', error);
    throw error;
  }
};

export const useResendPhoneCode = () => {
  return useMutation<ResendPhoneCodeResponse, Error, undefined>({
    /** @ts-ignore */
    mutationFn: registerUserPhone,
  });
};
