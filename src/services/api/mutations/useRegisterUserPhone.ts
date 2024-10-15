import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';
//import AsyncHelper from '../../../helpers/asyncHelper';

export interface RegisterUserPhoneResponse {
  token: {
    access: string;
    refresh: string;
  };
  user: {
    id: string;
    email: string;
  };
}

export type RegisterUserPhoneForm = {
  phone: string | any;
};

const registerUserPhone = async (formData: RegisterUserPhoneForm) => {
  try {
    const data = await api.post<RegisterUserPhoneResponse>(
      apiUrls.registerPhone,
      formData,
    );

    //AsyncHelper.setToken(data.token.access)
    //AsyncHelper.setRefreshToken(data.token.refresh)

    return data;
  } catch (error) {
    console.log('Error registering phone', error);
    throw error;
  }
};

export const useRegisterUserPhone = () => {
  return useMutation<RegisterUserPhoneResponse, Error, RegisterUserPhoneForm>({
    mutationFn: registerUserPhone,
  });
};
