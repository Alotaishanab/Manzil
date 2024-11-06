// src/services/urls.ts

export const BASE_URL = 'http://127.0.0.1:8000';

// API Endpoints
export const apiUrls = {
  // User account-related endpoints
  login: 'account/user/login/',
  signup: 'account/user/signup/',
  logout: 'account/user/logout/',
  registerPhone: 'account/user/register/phone/',
  verifyPhone: 'account/user/verify/phone/',
  changeUserPassword: 'account/user/change-password/',
  resetUserPassword: 'account/user/reset-password/',
  resendPhoneCode: 'account/user/resend/code/',
  userProfile: 'account/user/info/',
  refreshToken: 'account/user/refresh-token/',

  // Property-related endpoints
  addProperty: 'properties/add/',
  exploreNearbyProperties: 'properties/explore/near-by/',
  exploreInterestedProperties: 'properties/explore/interested/',
  getPropertyById: 'properties/property/',
  saveProperty: 'properties/',
  getSavedProperties: 'properties/user/saved-properties/',

  // Session-related endpoints
  startSession: 'account/user/start-session/',
  sessionHeartbeat: 'account/user/session-heartbeat/',
};

// WebSocket URL for the QA environment
export const getWebSocketUrl = (): string => 'ws://127.0.0.1:8000/ws/log-interactions/';
