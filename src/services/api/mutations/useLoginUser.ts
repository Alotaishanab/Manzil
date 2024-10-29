import { useMutation } from '@tanstack/react-query';
import api from '../../api/api';
import { apiUrls } from '../../utils/urls';
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

const login = async (loginData: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(apiUrls.login, loginData, false);
  
  if (response.data) {
    await AsyncHelper.setToken(response.data.token.access);
    await AsyncHelper.setRefreshToken(response.data.token.refresh);
  }
  
  return response.data;
};

export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
  });
};
