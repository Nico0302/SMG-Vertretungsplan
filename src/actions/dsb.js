import { getData } from '@services/dsb';
import { fetchTimetables } from '@actions/timetables';

export const REQUEST_DSB = 'REQUEST_DSB';
export const RECEIVE_DSB = 'RECEIVE_DSB';
export const RECEIVE_DSB_FAILED = 'RECEIVE_DSB_FAILED';

const requestDSB = () => ({
    type: REQUEST_DSB
});

const receiveDSB = (username, password) => ({
    type: RECEIVE_DSB,
    username,
    password,
    lastFetched: Date.now()
});

const requestDSBFailed = (error) => ({
    type: RECEIVE_DSB_FAILED,
    error
});

export function fetchDSB(username, password) {
    return async dispatch => {
        try {
            dispatch(requestDSB());
            const data = await getData(username, password);
            dispatch(receiveDSB(username, password, data));
            dispatch(fetchTimetables(data.timetables[0].timetableurl));

            return true;
        } catch(error) {
            dispatch(requestDSBFailed(error));
        }
    }
}

