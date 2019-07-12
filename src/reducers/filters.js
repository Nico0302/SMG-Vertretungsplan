import {
    LOGOUT
} from '@actions/auth';
import {
    TOGGLE_FILTER,
    ADD_CLASS_FILTER,
    ADD_SUBJECT_FILTER,
    REMOVE_CLASS_FILTER,
    REMOVE_SUBJECT_FILTER
} from '@actions/filters';

function filters(state = {
    data: [],
    isActive: false,
    isEmpty: true
}, action) {
    switch (action.type) {
        case TOGGLE_FILTER:
            return {
                ...state,
                isActive: !state.isActive
            };
        case ADD_CLASS_FILTER:
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        class: action.value,
                        subjects: []
                    }
                ]
            };
        case ADD_SUBJECT_FILTER:
            const filterIndex = state.data.findIndex(filter => filter.class === action.class);

            return {
                ...state,
                data: [
                    ...state.data,
                    [filterIndex]: {
                        class: action.value,
                        subjects: []
                    }
                ]
            };
        case SET_TIMETABLE_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    data: action.filter,
                    isActive: true
                }
            };
        case TOGGLE_TIMETABLE_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    isActive: state.filter ? !state.filter.isActive : true
                }
            };
        case LOGOUT:
            return {
                ...state,
                filter: {
                    data: null,
                    isActive: false
                },
                cache: null,
                sections: [],
                url: null,
                receivedAt: null,
                isEmpty: true
            };
        default:
            return state;
    }
}