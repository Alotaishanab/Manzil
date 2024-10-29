import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export class AsyncHelper {
  private static TOKEN_KEY = 'accessToken';
  private static REFRESH_TOKEN_KEY = 'refreshToken';
  private static FCM_TOKEN_KEY = 'fcmToken';
  private static GUEST_ID_KEY = 'guest_id';
  private static USER_ID_KEY = 'user_id'; // New constant for user ID
  private static FIRST_TIME_KEY = 'firstTime';

  // Token Management
  static async setToken(token: string) {
    try {
      console.log("Storing access token:", token);
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }

  static async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(this.TOKEN_KEY);
      console.log("Retrieved access token:", token);
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  }

  static async removeToken() {
    try {
      await AsyncStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // User ID Management
  static async setUserId(userId: string) { // New method
    try {
      await AsyncStorage.setItem(this.USER_ID_KEY, userId);
    } catch (error) {
      console.error("Error saving user ID:", error);
    }
  }

  static async getUserId(): Promise<string | null> { // New method
    try {
      const userId = await AsyncStorage.getItem(this.USER_ID_KEY);
      console.log("Retrieved user ID:", userId);
      return userId;
    } catch (error) {
      console.error("Error retrieving user ID:", error);
      return null;
    }
  }

  static async removeUserId() { // New method
    try {
      await AsyncStorage.removeItem(this.USER_ID_KEY);
    } catch (error) {
      console.error("Error removing user ID:", error);
    }
  }

  // Set "first-time" flag after initial setup is completed
  static async setFirstTimeFlag() {
    try {
      await AsyncStorage.setItem(this.FIRST_TIME_KEY, 'false');
    } catch (error) {
      console.error('Error setting first-time flag:', error);
    }
  }

  static async isFirstTime(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(this.FIRST_TIME_KEY);
      return value === null; // If null, this means it's the first time
    } catch (error) {
      console.error('Error checking first-time status:', error);
      return true;
    }
  }

  // Refresh Token Management
  static async setRefreshToken(refreshToken: string) {
    try {
      await AsyncStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.error('Error saving refresh token:', error);
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  }

  static async removeRefreshToken() {
    try {
      await AsyncStorage.removeItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing refresh token:', error);
    }
  }

  // Guest ID Management
  static async getGuestId(): Promise<string> {
    try {
      let guestId = await AsyncStorage.getItem(this.GUEST_ID_KEY);
      if (!guestId) {
        guestId = uuid.v4() as string;
        await AsyncStorage.setItem(this.GUEST_ID_KEY, guestId);
      }
      return guestId;
    } catch (error) {
      console.error('Error retrieving guest ID:', error);
      throw error;
    }
  }

  static async removeGuestId() {
    try {
      await AsyncStorage.removeItem(this.GUEST_ID_KEY);
    } catch (error) {
      console.error('Error removing guest ID:', error);
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

  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}

export default AsyncHelper;
