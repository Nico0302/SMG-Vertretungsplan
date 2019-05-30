import { getData } from '@services/dsb';
import { fetchTimetables } from '@actions/timetables';

export const REQUEST_DSB = 'REQUEST_DSB';
export const RECEIVE_DSB = 'RECEIVE_DSB';
export const AUTHENTIFICATION_FAILURE = 'AUTHENTIFICATION_FAILURE';

const requestDSB = () => ({
    type: REQUEST_DSB
});

const receiveDSB = (username, password) => ({
    type: RECEIVE_DSB,
    username,
    password,
    lastFetched: Date.now()
});

const authentificationFailure = (error) => ({
    type: AUTHENTIFICATION_FAILURE,
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
            if (error.message === 'Login failed.')
                dispatch(authentificationFailure(error));
            throw error;
        }
    }
}

