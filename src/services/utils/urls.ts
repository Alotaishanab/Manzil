// src/services/urls.ts
export const BASE_URL_WITHOUT_TRANSPORT = '127.0.0.1:8000';
export const BASE_URL = `http://${BASE_URL_WITHOUT_TRANSPORT}`;
// 192.168.1.212 
// 127.0.0.1:8000
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
  updateProfilePicture: 'account/user/update-profile-picture/',

  // Property-related endpoints
  addProperty: 'properties/add/',
  exploreNearbyProperties: 'properties/explore/near-by/',
  exploreInterestedProperties: 'properties/explore/interested/',
  getPropertyById: 'properties/property/',
  saveProperty: 'properties/:id/save/',
  getUserProperties: 'properties/user/my-properties/',
  getSavedProperties: 'properties/user/saved-properties/',
  makePropertyFeatured: 'properties/user/my-properties',

  // Session-related endpoints
  startSession: 'account/user/start-session/',
  sessionHeartbeat: 'account/user/session-heartbeat/',

  // Message-related endpoints
  fetchConversations: 'messaging/conversations/',
  fetchSentMessages: 'messaging/sent/',
  fetchChats: 'messaging/chats/',

};

// WebSocket URLs
export const getLogInteractionsWebSocketUrl = (): string =>
  `ws://${BASE_URL_WITHOUT_TRANSPORT}/ws/log-interactions/`;
export const getMessagesWebSocketUrl = (): string =>
  `ws://${BASE_URL_WITHOUT_TRANSPORT}/ws/messages/`;
