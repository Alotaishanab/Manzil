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
  try{
  const data = await api.post<SignUpResponse>(apiUrls.signup, formData, false);
  console.log('signup response', data)

 

  /** @ts-ignore */
  await AsyncHelper.setToken(data.token.access);
  /** @ts-ignore */
  await AsyncHelper.setRefreshToken(data.token.refresh);
  
  return data;
}
catch(err){
  console.log(err);
  throw err;
}
};

export const useSignupUser = () => {
  return useMutation<SignUpResponse, Error, SignUpForm>({
    /** @ts-ignore */
    mutationFn: signup,
  });
};
