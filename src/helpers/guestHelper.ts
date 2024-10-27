// src/helpers/guestHelper.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const GUEST_ID_KEY = 'guest_id';

/**
 * Retrieves the Guest ID from AsyncStorage. If it doesn't exist, generates a new UUID and stores it.
 * @returns {Promise<string>} The Guest ID as a string.
 */
export const getGuestId = async (): Promise<string> => {
  try {
    let guestId = await AsyncStorage.getItem(GUEST_ID_KEY);
    console.log('Retrieved guest_id:', guestId);
    if (!guestId) {
      guestId = uuid.v4() as string;
      await AsyncStorage.setItem(GUEST_ID_KEY, guestId);
      console.log('Generated new guest_id:', guestId);
    }
    return guestId;
  } catch (error) {
    console.error('Error retrieving guest ID:', error);
    throw error;
  }
};

