import moment from 'moment';
import { fetchTimetableData } from '@services/dsb';
import UntisParser from '@services/untisParser';
import { fetchHtml } from '@services/fetch';

export const FETCH_TIMETABLES_REQUEST = 'FETCH_TIMETABLES_REQUEST';
export const FETCH_TIMETABLES_FAILURE = 'FETCH_TIMETABLES_FAILURE';
export const FETCH_TIMETABLES_SUCCESS = 'FETCH_TIMETABLES_SUCCESS';

export const TOGGLE_HIDE_PAST = 'TOGGLE_HIDE_PAST';

/**
 * Fetch the current timetables from the DSB api.
 *
 * @param {Object} [param]
 * @param {String} parma.username
 * @param {String} param.password
 * @param {String} param.appId
 */
export function fetchTimetables({ username, password, appId } = {}) {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const receivedAt = state.timetables.receivedAt;

            if (username === undefined) username = state.auth.username;
            if (password === undefined) password = state.auth.password;
            if (appId === undefined) appId = state.auth.appId;

            if (moment().diff(moment(receivedAt)) < 10000)
                throw new Error('To many requests.');

            dispatch({
                type: FETCH_TIMETABLES_REQUEST
            });
            const dsbTimetables = await fetchTimetableData({
                username,
                password,
                appId,
                lastUpdate: receivedAt
            });
            // only on timetable is used
            const { Detail } = dsbTimetables.Childs[0];
            if (state.timetables.url === Detail && state.timetables.cache) {
                dispatch({
                    type: FETCH_TIMETABLES_SUCCESS,
                    receivedAt: moment().toISOString()
                });
            } else {
                const htmlTimetable = await fetchHtml(Detail);
                const parser = new UntisParser(htmlTimetable);

                dispatch({
                    type: FETCH_TIMETABLES_SUCCESS,
                    timetables: parser.timetables,
                    url: Detail,
                    receivedAt: moment().toISOString()
                });
            }
            return true;
        } catch (error) {
            if (error.message !== 'To many requests.') {
                dispatch({
                    type: FETCH_TIMETABLES_FAILURE,
                    error,
                    receivedAt: moment().toISOString()
                });
            }
            throw error;
        }
    };
}

/**
 * Toggle hide past option.
 */
export const toggleHidePast = () => ({
    type: TOGGLE_HIDE_PAST
});
