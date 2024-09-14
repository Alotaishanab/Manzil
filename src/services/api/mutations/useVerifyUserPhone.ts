import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';

export interface VerifyUserPhoneResponse {
  token: {
    access: string;
    refresh: string;
  };
  user: {
    id: string;
    email: string;
  };
}

export type VerifyUserPhoneForm = {
verification_code: string | number | any;
  //phone_number: string | any;
};

const verifyUserPhone = async (formData: VerifyUserPhoneForm) => {
  const {data} = await api.post<VerifyUserPhoneResponse>(apiUrls.verifyPhone, formData);
  

  
  return data;
};

export const useVerifyUserPhone = () => {
  return useMutation<VerifyUserPhoneResponse, Error, VerifyUserPhoneForm>({
    mutationFn: verifyUserPhone,
  });
};
