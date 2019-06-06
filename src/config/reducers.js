import moment from 'moment';
import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT
} from '@actions/auth';
import {
    FETCH_TIMETABLES_REQUEST,
    FETCH_TIMETABLES_FAILURE,
    FETCH_TIMETABLES_SUCCESS,
    SET_TIMETABLE_FILTER,
    TOGGLE_TIMETABLE_FILTER
} from '@actions/timetables';

function auth(state = {
    isLoading: false
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                isLoading: false
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                token: null,
                isLoading: false,
                error: action.error
            };
        case LOGOUT: {
            return {
                ...state,
                token: null
            };
        }
        default:
            return state;
    }
}

function generateSections(data, filter) {
    if (data) {
        return data.map(timetable => ({
            // format date as title
            title: moment(timetable[0].date).format('dddd, DD.MM.YYYY'),
            // check if filter exists and is active
            data: filter.isActive && filter.data ?
                // apply filter
                timetable.filter(entry => entry.classes.find(className =>
                    className.toLowerCase().includes(filter.data.toLowerCase()))
                )
                : timetable
        }));
    }
    return [];
}

function timetables(state = {
    isLoading: false,
    isEmpty: true,
    filter: {
        isActive: false
    },
    data: null,
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
                    data: action.timetables,
                    sections: generateSections(action.timetables, state.filter),
                    url: action.url,
                    requestedAt: action.requestedAt
                };
            }
            return {
                ...state,
                isLoading: false,
                sections: generateSections(state.data, state.filter),
                requestedAt: action.requestedAt
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
                data: null,
                sections: [],
                url: null,
                requestedAt: null,
                isEmpty: true
            };
        default:
            return state;
    }
}

export const timetablesReducer = timetables;
export const authReducer = auth;