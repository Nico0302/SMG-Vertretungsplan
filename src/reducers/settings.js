import { VERSION_NUMBER } from '@config/info';
import { LOGOUT } from '@actions/auth';
import {
    MIGRATE_STORE,
    CHANGE_THEME
} from '@actions/settings';

function settings(state = {
    version: VERSION_NUMBER,
    theme: 'default'
}, action) {
    switch (action.type) {
        case MIGRATE_STORE:
            return {
                ...state,
                version: VERSION_NUMBER,
                theme: 'default'
            };
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.theme
            };
        case LOGOUT:
            return {
                ...state,
                theme: 'default'
            };
        default:
            return state;
    }
}

export default settings;