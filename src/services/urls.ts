export const HOST = '';
export const DEV = '';
export const QA = '';
export const CLIENTSERVER = '';
export const PRODUCTION = '';

export const apiUrls = {
  // User account-related endpoints
  login: 'account/user/login',
  signup: 'account/user/signup',
  logout: 'account/user/logout',
  registerPhone: 'account/user/register/phone',
  verifyPhone: 'account/user/verify/phone',
  changeUserPassword: 'account/user/change-password',
  resetUserPassword: 'account/user/reset-password',
  resendPhoneCode: 'account/user/resend/code',
  userProfile: 'account/user/info',
  refreshToken: 'account/user/refresh-token',

  // Property-related endpoints
  addProperty: 'properties/add',
  exploreNearbyProperties: 'properties/explore/near-by',
  exploreInterestedProperties: 'properties/explore/interested',
  getPropertyById: 'properties/property',
  saveProperty: 'properties',
  getSavedProperties: 'properties/user/saved-properties',

  // Session-related endpoints
  startSession: 'account/user/start-session/',
  sessionHeartbeat: 'account/user/session-heartbeat/',

  // Property interaction endpoints
  trackPropertyView: 'properties/view/',  // Track when a property is viewed (POST)
  endPropertyView: 'properties/end-view/',  // Track when a property view ends (POST)
  trackPropertyClick: 'properties/click/',  // Track when a property is clicked (POST)
};
