import moment from 'moment';

export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const SET_CLASS_FILTER = 'SET_CLASS_FILTER';
export const ADD_SUBJECT_FILTER = 'ADD_SUBJECT_FILTER';
export const REMOVE_SUBJECT_FILTER = 'REMOVE_SUBJECT_FILTER';

export const UPLOAD_FILTER_REQUEST = 'UPLOAD_FILTER_REQUEST';
export const UPLOAD_FILTER_SUCCESS = 'UPLOAD_FILTER_SUCCESS';
export const UPLOAD_FILTER_FAILURE = 'UPLOAD_FILTER_FAILURE';

/**
 * Toggle timetable filter.
 */
export const toggleFilter = () => ({
    type: TOGGLE_FILTER
});

/**
 * Update timetable class filter.
 *
 * @param {String} className
 */
export const setClassFilter = className => ({
    type: SET_CLASS_FILTER,
    class: className
});

/**
 * Add a subject to the timetable filter.
 *
 * @param {String} subjectName
 */
export const addSubjectFilter = subjectName => ({
    type: ADD_SUBJECT_FILTER,
    subject: subjectName
});

/**
 * Remove a subject from the timetable filter.
 *
 * @param {String} subjectName
 */
export const removeSubjectFilter = subjectName => ({
    type: REMOVE_SUBJECT_FILTER,
    subject: subjectName
});

/**
 * Upload filter to Firebase Firestore database.
 */
export function uploadFilter() {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const { fcmToken } = state.auth;

            dispatch({
                type: UPLOAD_FILTER_REQUEST,
                appId
            });

            if (!fcmToken) {
                throw new Error('Invalid FCM token!');
            }

            // TODO: filter upload function

            dispatch({
                type: UPLOAD_FILTER_SUCCESS,
                lastUpload: moment().format()
            });
            return response;
        } catch (error) {
            dispatch({
                type: UPLOAD_FILTER_FAILURE,
                error
            });
            throw error;
        }
    };
}