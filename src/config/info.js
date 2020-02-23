import { Platform } from 'react-native';
import { 
    getBuildNumber,
    getVersion,
    getSystemVersion,
    getApiLevel
} from 'react-native-device-info';

export const VERSION_NUMBER = parseInt(getBuildNumber()) || 12;
export const VERSION_NAME = getVersion();
export const BUNDLE_ID =
    Platform.OS === 'ios'
        ? 'io.gres.smg-vertretungsplan'
        : 'io.gres.smg_vertretungsplan';

export const SYSTEM_DARK_MODE_READY = Platform.OS === 'ios' ?
    parseInt(getSystemVersion().split('.')[0]) >= 13 :
    getApiLevel() >= 29;
