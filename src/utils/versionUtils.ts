import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export interface AppInfo {
  platform: 'Android' | 'iOS';
  currentVersion: string;
}

// This remains unchanged
export async function getAppInfo(): Promise<AppInfo> {
  const platformName = Platform.OS === 'android' ? 'Android' : 'iOS';
  const appVersion = await DeviceInfo.getVersion(); // This is a Promise

  return {
    platform: platformName,
    currentVersion: appVersion,
  };
}

export function isUpdateRequired(
  currentVersion: string,
  latestVersion: string,
): boolean {
  const sanitizedCurrentVersion = currentVersion.replace(/[^\d.]/g, '');
  const sanitizedLatestVersion = latestVersion.replace(/[^\d.]/g, '');

  console.log(
    'checking for update ',
    sanitizedCurrentVersion,
    ' -- ',
    sanitizedLatestVersion,
  );

  const currentParts = sanitizedCurrentVersion.split('.').map(Number);
  const latestParts = sanitizedLatestVersion.split('.').map(Number);

  for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const latestPart = latestParts[i] || 0;
    if (currentPart < latestPart) {
      return true;
    }
    if (currentPart > latestPart) {
      return false;
    }
  }
  return false;
}
