
import {
    LOGOUT
} from '@actions/auth';
import {
    TOGGLE_FILTER,
    SET_CLASS_FILTER,
    ADD_SUBJECT_FILTER,
    REMOVE_SUBJECT_FILTER
} from '@actions/filters';

function filters(state = {
    class: '',
    subjects: [],
    isActive: false,
    isEmpty: true
}, action = {}) {
    switch (action.type) {
        case TOGGLE_FILTER:
            return {
                ...state,
                isActive: !state.isActive
            };
        case SET_CLASS_FILTER:
            return {
                ...state,
                class: action.class,
                isEmpty: action.class === '',
                isActive: action.class !== ''
            };
        case ADD_SUBJECT_FILTER:
            return {
                ...state,
                subjects: [
                    ...state.subjects,
                    action.subject
                ]
            };
        case REMOVE_SUBJECT_FILTER:
            return {
                ...state,
                subjects: state.subjects.filter(subject => subject !== action.subject)
            };
        case LOGOUT:
            return {
                ...state,
                class: '',
                subjects: [],
                isEmpty: true,
                isActive: false
            };
        default:
            return state;
    }
}

export default filters;