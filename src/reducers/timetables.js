import {
    LOGOUT
} from '@actions/auth';
import {
    FETCH_TIMETABLES_REQUEST,
    FETCH_TIMETABLES_FAILURE,
    FETCH_TIMETABLES_SUCCESS,
    SET_TIMETABLE_FILTER,
    TOGGLE_TIMETABLE_FILTER
} from '@actions/timetables';

function timetables(state = {
    isLoading: false,
    isEmpty: true,
    filter: {
        isActive: false
    },
    cache: null,
    sections: []
}, action) {
    switch (action.type) {
        case FETCH_TIMETABLES_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_TIMETABLES_SUCCESS:
            if (action.timetables) {
                return {
                    ...state,
                    isLoading: false,
                    isEmpty: action.timetables.length < 1,
                    cache: action.timetables,
                    sections: generateSections(action.timetables, state.filter),
                    url: action.url,
                    receivedAt: action.receivedAt
                };
            }
            return {
                ...state,
                isLoading: false,
                sections: generateSections(state.cache, state.filter),
                receivedAt: action.receivedAt
            };
        case FETCH_TIMETABLES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
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

export default timetables;