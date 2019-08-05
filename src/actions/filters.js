export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const SET_CLASS_FILTER = 'SET_CLASS_FILTER';
export const ADD_SUBJECT_FILTER = 'ADD_SUBJECT_FILTER';
export const REMOVE_SUBJECT_FILTER = 'REMOVE_SUBJECT_FILTER';

export const toggleFilter = () => ({
    type: TOGGLE_FILTER
});

export const setClassFilter = (className) => ({
    type: SET_CLASS_FILTER,
    class: className
});

export const addSubjectFilter = (className, subjectName) => ({
    type: ADD_SUBJECT_FILTER,
    class: className,
    subject: subjectName
});

export const removeSubjectFilter = (className, subjectName) => ({
    type: REMOVE_SUBJECT_FILTER,
    class: className,
    subject: subjectName
});