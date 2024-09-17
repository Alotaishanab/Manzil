import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';
import AsyncHelper from '../../../helpers/asyncHelper';

export interface LoginResponse {
  token: {
    access: string;
    refresh: string;
  };
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
  const data = await api.post<LoginResponse>(apiUrls.login, loginData,false);

  await AsyncHelper.setToken(data.token.access);
  await AsyncHelper.setRefreshToken(data.token.refresh);

  return data;
};

export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
  });
};
