import { Platform } from 'react-native';

// Local IP fallback (used on physical devices if needed)
const LOCAL_IP = '192.168.1.212'; // <- Replace with your actual local IP

// Dynamically select the base address
const BASE_HOST = Platform.select({
  ios: 'localhost',        // iOS Simulator can use localhost
  android: '10.0.2.2',      // Android Emulator maps this to host machine
  default: LOCAL_IP,        // Physical devices, fallback to local IP
});

export const BASE_URL_WITHOUT_TRANSPORT = `${BASE_HOST}:8000`;
export const BASE_URL = `http://${BASE_URL_WITHOUT_TRANSPORT}`;

// API Endpoints
export const apiUrls = {
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

  addProperty: 'properties/add/',
  updateProperty: 'properties/update/',
  exploreNearbyProperties: 'properties/explore/near-by/',
  exploreInterestedProperties: 'properties/explore/interested/',
  getPropertyById: 'properties/property/',
  saveProperty: 'properties/:id/save/',
  getUserProperties: 'properties/user/my-properties/',
  getSavedProperties: 'properties/user/saved-properties/',
  makePropertyFeatured: 'properties/user/my-properties',

  startSession: 'account/user/start-session/',
  sessionHeartbeat: 'account/user/session-heartbeat/',

  fetchConversations: 'messaging/conversations/',
  fetchSentMessages: 'messaging/sent/',
  fetchChats: 'messaging/chats/',
};

// WebSocket URLs
export const getLogInteractionsWebSocketUrl = (): string =>
  `ws://${BASE_URL_WITHOUT_TRANSPORT}/ws/log-interactions/`;

export const getMessagesWebSocketUrl = (): string =>
  `ws://${BASE_URL_WITHOUT_TRANSPORT}/ws/messages/`;
