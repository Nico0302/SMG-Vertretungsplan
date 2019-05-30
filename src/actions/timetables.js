import UntisParser from '@services/untisParser';

export const REQUEST_TIMETABLES = 'REQUEST_TIMETABLES';
export const RECEIVE_TIMETABLES = 'RECEIVE_TIMETABLES';

const requestTimetables = (url) => ({
    type: REQUEST_TIMETABLES,
    url
});

const receiveTimetables = (timetables) => ({
    type: RECEIVE_TIMETABLES,
    timetables,
    lastFetched: Date.now()
});

export function fetchTimetables(url) {
    return async (dispatch, getState) => {
        try {
            dispatch(requestTimetables(url));
            if (getState().timetables.url === url) {
                dispatch(receiveTimetables());
            } else {
                const response = await fetch(url);
                const htmlTimetable = await response.text();
                const parser = new UntisParser(htmlTimetable);
                dispatch(receiveTimetables(parser.timetables));
            }
        } catch(error) {
            console.error(error);
        }
    }
}