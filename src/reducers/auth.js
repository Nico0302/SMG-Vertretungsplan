import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT
} from '@actions/auth';

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

export default auth;