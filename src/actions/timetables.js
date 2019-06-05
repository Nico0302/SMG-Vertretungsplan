import UntisParser from '@services/untisParser';
import { getTimetables } from '@services/dsb';
import moment from 'moment';

export const FETCH_TIMETABLES_REQUEST = 'FETCH_TIMETABLES_REQUEST';
export const FETCH_TIMETABLES_FAILURE = 'FETCH_TIMETABLES_FAILURE';
export const FETCH_TIMETABLES_SUCCESS = 'FETCH_TIMETABLES_SUCCESS';
export const SET_TIMETABLE_FILTER = 'ADD_TIMETABLE_FILTER';
export const TOGGLE_TIMETABLE_FILTER = 'TOGGLE_TIMETABLE_FILTER';

export function fetchTimetables() {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const { token } = state.auth;

            dispatch({
                type: FETCH_TIMETABLES_REQUEST
            });

            const data = await getTimetables(token);
            // only on timetable is used
            const { timetableurl } = data[0];

            if (state.timetables.url === timetableurl) {
                dispatch({
                    type: FETCH_TIMETABLES_SUCCESS,
                    receivedAt: moment().toISOString()
                });
            } else {
                const response = await fetch(timetableurl);
                const htmlTimetable = await response.text();
                const parser = new UntisParser(htmlTimetable);

                dispatch({
                    type: FETCH_TIMETABLES_SUCCESS,
                    timetables: parser.timetables,
                    url: timetableurl,
                    receivedAt: moment().toISOString()
                });
            }
        } catch(error) {
            dispatch({
                type: FETCH_TIMETABLES_FAILURE,
                error
            });
        }
    }
}

export const setTimetableFilter = filter => ({
    type: SET_TIMETABLE_FILTER,
    filter
});

export const toggleTimetableFilter = () => ({
    type: TOGGLE_TIMETABLE_FILTER
});