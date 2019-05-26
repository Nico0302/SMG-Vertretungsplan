import UntisParser from '@services/untisParser';

export const REQUEST_TIMETABLES = 'REQUEST_TIMETABLES';
export const RECEIVE_TIMETABLES = 'RECEIVE_TIMETABLES';

const requestTimetables = (url) => ({
    type: REQUEST_TIMETABLES,
    url
});

const receiveTimetables = (timetables) => ({
    type: RECEIVE_TIMETABLES,
    timetables
});

export function fetchTimetables(url) {
    return async dispatch => {
        try {
            dispatch(requestTimetables());
            const response = await fetch(url);
            const htmlTimetable = await response.text();
            const parser = new UntisParser(htmlTimetable);
            dispatch(receiveTimetables(parser.timetables));
        } catch(error) {
            console.error(error);
        }
    }
}