import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT
} from '@actions/auth';

function auth(state = {
    username: null,
    password: null,
    appId: null,
    isLoading: false
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                appId: action.appId,
                isLoading: true,
                error: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                username: action.username,
                password: action.password,
                isLoading: false
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                username: null,
                password: null,
                isLoading: false,
                error: action.error
            };
        case LOGOUT: {
            return {
                ...state,
                username: null,
                password: null
            };
        }
        default:
            return state;
    }
}

export default auth;