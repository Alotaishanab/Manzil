// hooks/useLoginUser.ts

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
  const response = await api.post<LoginResponse>(
    apiUrls.login,
    loginData,
    false
  );

  // Removed token storage from here to handle it in the login handler
  return response; // Return response directly
};

export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
  });
};
