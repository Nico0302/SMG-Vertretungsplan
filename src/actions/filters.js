export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const SET_CLASS_FILTER = 'SET_CLASS_FILTER';
export const ADD_SUBJECT_FILTER = 'ADD_SUBJECT_FILTER';
export const REMOVE_SUBJECT_FILTER = 'REMOVE_SUBJECT_FILTER';

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
