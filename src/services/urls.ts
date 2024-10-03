export const HOST = '';
export const DEV = '';
export const QA = '';
export const CLIENTSERVER = '';
export const PRODUCTION = '';

export const apiUrls = {
  login: 'account/user/login',
  signup: 'account/user/signup',
  logout: 'account/user/logout',
  registerPhone: 'account/user/register/phone',
  verifyPhone: '/account/user/verify/phone',
  changeUserPassword: '/account/user/change-password',
  resetUserPassword: '/account/user/reset-password',
  resendPhoneCode: '/account/user/resend/code',

  addProperty: '/properties/add',
  exploreNearbyProperties: '/properties/explore/near-by',
  exploreInterestedProperties: '/properties/explore/interested',

  userProfile: '/api/user/',
};
