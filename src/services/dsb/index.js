import { getDeviceId, getSystemVersion } from 'react-native-device-info';
import moment from 'moment';
import { BUNDLE_ID } from '@config/info';
import decode from './decoding';
import encode from './encoding';

/**
 * Generates a RFC4122 version 4 compliant UUID.
 *
 * @returns {String}
 */
export function generateAppId() {
    let d = new Date().getTime();
    const appId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

    return appId;
}

/**
 * Fetch all timetable urls from the DSB api.
 *
 * @param {Object} param
 * @param {String} param.username
 * @param {String} param.password
 * @param {String} param.appId
 * @param {String} [param.lastUpdate] - ISO 8601 time string
 * @returns {Object}
 */
export async function fetchTimetableData({
    username,
    password,
    appId,
    lastUpdate
}) {
    const response = await fetch(
        'https://app.dsbcontrol.de/JsonHandler.ashx/GetData',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Connection: 'Keep-Alive',
                'Accept-Encoding': 'gzip'
            },
            body: JSON.stringify({
                req: {
                    Data: encode({
                        AppId: appId,
                        AppVersion: '2.5.9',
                        BundleId: BUNDLE_ID,
                        Date: moment().format('YYYY-MM-DD[T]HH:mm:ssSSSS00'),
                        Device: getDeviceId(),
                        Language: 'de',
                        LastUpdate: moment(lastUpdate).format(
                            'YYYY-MM-DD[T]HH:mm:ssSSSS00'
                        ),
                        OsVersion: getSystemVersion(),
                        UserId: username,
                        UserPw: password
                    }),
                    DataType: 1
                }
            })
        }
    );

    const responseJson = await response.json();
    const decodedData = decode(responseJson.d);

    if (decodedData.Resultcode > 0) {
        throw new Error(decodedData.ResultStatusInfo);
    }

    let timetableData = null;

    decodedData.ResultMenuItems.forEach(item =>
        item.Childs.forEach(child => {
            if (child.MethodName === 'timetable') {
                timetableData = child;
            }
        })
    );

    if (!timetableData) {
        throw new Error("Couldn't find method name 'timetable'.");
    }

    return timetableData.Root.Childs[0];
}
