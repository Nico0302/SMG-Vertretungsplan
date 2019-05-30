import { combineReducers } from 'redux';
import {
    REQUEST_DSB,
    RECEIVE_DSB,
    AUTHENTIFICATION_FAILURE
} from '@actions/dsb';
import {
    REQUEST_TIMETABLES,
    RECEIVE_TIMETABLES
} from '@actions/timetables';

function dsb(state = {
    isLoading: false,
    isEmpty: true
}, action) {
    switch (action.type) {
        case REQUEST_DSB:
            return {
                ...state,
                isLoading: true
            };
        case RECEIVE_DSB:
            return {
                ...state,
                isLoading: false,
                isEmpty: false
            };
        case AUTHENTIFICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                isEmpty: true
            };
        default:
            return state;
    }
}

function auth(state = {
    isEmpty: true
}, action) {
    switch (action.type) {
        case RECEIVE_DSB:
            return {
                ...state,
                username: action.username,
                password: action.password,
                isEmpty: false
            };
        case AUTHENTIFICATION_FAILURE:
            return {
                ...state,
                username: null,
                password: null,
                isEmpty: true,
                error: action.error
            };
        default:
            return state;
    }
}

function timetables(state = {
    isLoading: false,
    isEmpty: true
}, action) {
    switch (action.type) {
        case REQUEST_TIMETABLES:
            return {
                ...state,
                isLoading: true,
                url: action.url
            };
        case REQUEST_DSB:
            return {
                ...state,
                isLoading: true
            };
        case RECEIVE_TIMETABLES:
            if (action.timetables) {
                return {
                    ...state,
                    isLoading: false,
                    isEmpty: action.timetables.length < 1,
                    data: action.timetables
                };
            }
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    dsb,
    auth,
    timetables
});

export default rootReducer