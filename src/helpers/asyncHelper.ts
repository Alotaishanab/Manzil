import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncHelper {
  // Key constants
  private static TOKEN_KEY = 'accessToken';
  private static REFRESH_TOKEN_KEY = 'refreshToken';
  private static FCM_TOKEN_KEY = 'fcmToken';
  private static USER_ID_KEY = 'userId';

  // Set token
  static async setToken(token: string) {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  // Get token
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  // Remove token
  static async removeToken() {
    try {
      await AsyncStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // Set refresh token
  static async setRefreshToken(refreshToken: string) {
    try {
      await AsyncStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.error('Error saving refresh token:', error);
    }
  }

  // Remove refresh token
  static async removeRefreshToken() {
    try {
      await AsyncStorage.removeItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing refresh token:', error);
    }
  }

  // Set FCM token
  static async setFCMToken(fcmToken: string) {
    try {
      await AsyncStorage.setItem(this.FCM_TOKEN_KEY, fcmToken);
    } catch (error) {
      console.error('Error saving FCM token:', error);
    }
  }

  // Remove FCM token
  static async removeFCMToken() {
    try {
      await AsyncStorage.removeItem(this.FCM_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing FCM token:', error);
    }
  }

  // Set user ID
  static async setUserId(userId: string) {
    try {
      await AsyncStorage.setItem(this.USER_ID_KEY, userId);
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  }

  // Remove user ID
  static async removeUserId() {
    try {
      await AsyncStorage.removeItem(this.USER_ID_KEY);
    } catch (error) {
      console.error('Error removing user ID:', error);
    }
  }
}


export default AsyncHelper;