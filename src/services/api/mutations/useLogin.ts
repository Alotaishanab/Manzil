import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}
export interface LoginCredentials {
  email: string;
  password: string;
}

const login = async (loginData: LoginCredentials) => {
  const {data} = await api.post<LoginResponse>(apiUrls.login, loginData);
  return data;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
  });
};
