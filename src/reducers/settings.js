import { VERSION_NUMBER } from '@config/info';
import { LOGOUT } from '@actions/auth';
import { MIGRATE_STORE, CHANGE_THEME, SET_DARK_MODE } from '@actions/settings';

function settings(
    state = {
        version: VERSION_NUMBER,
        theme: 'default',
        darkMode: false
    },
    action
) {
    switch (action.type) {
        case MIGRATE_STORE:
            if (action.version < 4) {
                return {
                    ...state,
                    version: VERSION_NUMBER,
                    theme: 'default',
                    darkMode: false
                };
            }
            if (action.version < 12) {
                const darkMode = state.theme === 'dark';
                
                return {
                    ...state,
                    version: VERSION_NUMBER,
                    theme: darkMode ? 'default' : state.theme,
                    darkMode
                };
            }


            return {
                ...state,
                version: VERSION_NUMBER
            };
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.theme
            };
        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.active
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
