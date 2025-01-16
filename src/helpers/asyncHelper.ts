// src/helpers/asyncHelper.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import uuid from 'react-native-uuid';

export class AsyncHelper {
  private static TOKEN_SERVICE = 'com.yourapp.token';
  private static REFRESH_TOKEN_SERVICE = 'com.yourapp.refreshToken';
  // We'll store the guestId in its own keychain service:
  private static GUEST_ID_SERVICE = 'com.yourapp.guestId';
  // (We keep the fallback key in AsyncStorage for redundancy.)
  private static GUEST_ID_FALLBACK_KEY = 'guest_id_fallback';
  private static USER_ID_KEY = 'user_id';
  private static FIRST_TIME_KEY = 'firstTime';

  // --- Secure Token Management with Fallback (unchanged) ---
  static async setToken(token: string) {
    try {
      console.log("Storing access token securely via Keychain.");
      await Keychain.setGenericPassword('token', token, { service: this.TOKEN_SERVICE });
    } catch (error) {
      console.error("Error saving token via Keychain:", error);
    }
    await AsyncStorage.setItem('accessTokenFallback', token);
  }

  static async getToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({ service: this.TOKEN_SERVICE });
      if (credentials && credentials.password) {
        console.log("Retrieved access token via Keychain: [Token Present]");
        return credentials.password;
      }
      throw new Error("No token in Keychain");
    } catch (error) {
      console.warn("Keychain getToken failed, using AsyncStorage fallback:", error);
      const fallback = await AsyncStorage.getItem('accessTokenFallback');
      console.log("Retrieved access token from fallback:", fallback ? '[Token Present]' : '[No Token]');
      return fallback;
    }
  }

  static async removeToken() {
    try {
      await Keychain.resetGenericPassword({ service: this.TOKEN_SERVICE });
      console.log("Access token removed securely via Keychain.");
    } catch (error) {
      console.error('Error removing token via Keychain:', error);
    }
    await AsyncStorage.removeItem('accessTokenFallback');
  }

  // --- Refresh Token Management with Fallback (unchanged) ---
  static async setRefreshToken(refreshToken: string) {
    try {
      await Keychain.setGenericPassword('refreshToken', refreshToken, { service: this.REFRESH_TOKEN_SERVICE });
      console.log('Refresh token set securely via Keychain.');
    } catch (error) {
      console.error("Error saving refresh token via Keychain:", error);
    }
    await AsyncStorage.setItem('refreshTokenFallback', refreshToken);
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({ service: this.REFRESH_TOKEN_SERVICE });
      if (credentials && credentials.password) {
        console.log("Retrieved refresh token via Keychain: [Refresh Token Present]");
        return credentials.password;
      }
      throw new Error("No refresh token in Keychain");
    } catch (error) {
      console.warn("Keychain getRefreshToken failed, using AsyncStorage fallback:", error);
      const fallback = await AsyncStorage.getItem('refreshTokenFallback');
      console.log("Retrieved refresh token from fallback:", fallback ? '[Refresh Token Present]' : '[No Refresh Token]');
      return fallback;
    }
  }

  static async removeRefreshToken() {
    try {
      await Keychain.resetGenericPassword({ service: this.REFRESH_TOKEN_SERVICE });
      console.log('Refresh token removed securely via Keychain.');
    } catch (error) {
      console.error("Error removing refresh token via Keychain:", error);
    }
    await AsyncStorage.removeItem('refreshTokenFallback');
  }

  // --- User ID Management (using AsyncStorage) ---
  static async setUserId(userId: string) {
    try {
      console.log("Storing user ID:", userId);
      await AsyncStorage.setItem(this.USER_ID_KEY, userId);
    } catch (error) {
      console.error("Error saving user ID:", error);
    }
  }

  static async getUserId(): Promise<string | null> {
    try {
      const userId = await AsyncStorage.getItem(this.USER_ID_KEY);
      console.log("Retrieved user ID:", userId ? userId : 'null');
      return userId;
    } catch (error) {
      console.error("Error retrieving user ID:", error);
      return null;
    }
  }

  static async removeUserId() {
    try {
      await AsyncStorage.removeItem(this.USER_ID_KEY);
      console.log("User ID removed.");
    } catch (error) {
      console.error("Error removing user ID:", error);
    }
  }

  // --- Guest ID Management (using Keychain with AsyncStorage Fallback) ---
  static async setGuestId(guestId: string) {
    try {
      console.log("Storing guest ID securely via Keychain.");
      await Keychain.setGenericPassword('guestId', guestId, { service: this.GUEST_ID_SERVICE });
    } catch (error) {
      console.error("Error saving guest ID via Keychain:", error);
    }
    await AsyncStorage.setItem(this.GUEST_ID_FALLBACK_KEY, guestId);
  }

  static async getGuestId(autoGenerate: boolean = true): Promise<string | null> {
    try {
      // Try Keychain first
      const credentials = await Keychain.getGenericPassword({ service: this.GUEST_ID_SERVICE });
      if (credentials && credentials.password) {
        console.log("Retrieved guest ID via Keychain:", credentials.password);
        return credentials.password;
      }
      throw new Error("No guest ID in Keychain");
    } catch (error) {
      console.warn("Keychain getGuestId failed, using AsyncStorage fallback:", error);
      let guestId = await AsyncStorage.getItem(this.GUEST_ID_FALLBACK_KEY);
      if (!guestId && autoGenerate) {
        guestId = uuid.v4() as string;
        console.log("Generated new guest ID:", guestId);
        await AsyncStorage.setItem(this.GUEST_ID_FALLBACK_KEY, guestId);
      } else if (guestId) {
        console.log("Retrieved guest ID from fallback:", guestId);
      }
      // Also store in Keychain for future calls
      if (guestId) await this.setGuestId(guestId);
      return guestId;
    }
  }

  static async removeGuestId() {
    try {
      await Keychain.resetGenericPassword({ service: this.GUEST_ID_SERVICE });
      console.log("Guest ID removed securely via Keychain.");
    } catch (error) {
      console.error("Error removing guest ID via Keychain:", error);
    }
    await AsyncStorage.removeItem(this.GUEST_ID_FALLBACK_KEY);
  }

  // --- First-Time Flag Management (using AsyncStorage) ---
  static async setFirstTimeFlag() {
    try {
      await AsyncStorage.setItem(this.FIRST_TIME_KEY, 'false');
      console.log('First-time flag set to false.');
    } catch (error) {
      console.error('Error setting first-time flag:', error);
    }
  }

  static async isFirstTime(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(this.FIRST_TIME_KEY);
      const isFirstTime = value === null;
      console.log("Is first time:", isFirstTime);
      return isFirstTime;
    } catch (error) {
      console.error("Error checking first-time status:", error);
      return true;
    }
  }

  // --- Authentication Status ---
  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}

export default AsyncHelper;
