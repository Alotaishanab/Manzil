import {useMutation} from '@tanstack/react-query';
import api from '../api';
import {apiUrls} from '../../urls';
import AsyncHelper from '../../../helpers/asyncHelper';





const logoutUser = async () => {

    const refresh = await AsyncHelper.getRefreshToken()
   await api.post<{}>(apiUrls.logout, {refresh});
  
  await AsyncHelper.removeToken()
  await AsyncHelper.removeRefreshToken()
  
  return undefined;
};

export const useLogOutUser = () => {
  return useMutation<undefined, Error>({
    mutationFn: logoutUser,
  });
};
