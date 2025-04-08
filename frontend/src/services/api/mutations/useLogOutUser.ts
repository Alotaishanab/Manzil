import {useMutation} from '@tanstack/react-query';
import api from '../../api/api';
import {apiUrls} from '../../utils/urls';
import AsyncHelper from '../../../helpers/asyncHelper';

const logoutUser = async () => {
  const refresh = await AsyncHelper.getRefreshToken();
  if (!refresh) {
    console.log('No refresh token => local logout only');
    await AsyncHelper.removeToken();
    await AsyncHelper.removeRefreshToken();
    return;
  }

  try {
    // Call the server
    await api.post<{}>(apiUrls.logout, { refresh });
  } catch (error) {
    console.warn('Server logout failed, maybe token is expired. Doing local cleanup anyway.');
  }

  // In any case, remove local tokens
  await AsyncHelper.removeToken();
  await AsyncHelper.removeRefreshToken();

  return undefined;
};


export const useLogOutUser = () => {
  return useMutation<undefined, Error>({
    mutationFn: logoutUser,
  });
};
