import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';
import AsyncHelper from '../../../helpers/asyncHelper';

export interface SignUpResponse {
  token: {
    access: string;
    refresh: string;
  };
  user: {
    id: string;
    email: string;
  };
}

export type SignUpForm = {
  email: string | number | any;
  password: string | number | any;
  name: string;
  confirmPassword: string | any;
};

const signup = async (formData: SignUpForm) => {
  const {data} = await api.post<SignUpResponse>(apiUrls.signup, formData);
  
  await AsyncHelper.setToken(data.token.access);
  await AsyncHelper.setRefreshToken(data.token.refresh);
  
  return data;
};

export const useSignupUser = () => {
  return useMutation<SignUpResponse, Error, SignUpForm>({
    mutationFn: signup,
  });
};
