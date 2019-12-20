import { Platform } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';

export const VERSION_NUMBER = parseInt(getBuildNumber());
export const VERSION_NAME = getVersion();
export const BUNDLE_ID =
    Platform.OS === 'ios'
        ? 'io.gres.smg-vertretungsplan'
        : 'io.gres.smg_vertretungsplan';
