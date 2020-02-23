export const CHANGE_THEME = 'CHANGE_THEME';
export const SET_DARK_MODE = 'SET_DARK_MODE';
export const MIGRATE_STORE = 'MIGRATE_STORE';

/**
 * Update the current theme name.
 *
 * The name must be one of the key exported from config/theme.js.
 *
 * @param {String} theme
 */
export const setTheme = theme => ({
    type: CHANGE_THEME,
    theme
});

/**
 * Activates or disabled dark mode.
 * 
 * @param {Boolean} active 
 */
export const setDarkMode = active => ({
    type: SET_DARK_MODE,
    active
})

/**
 * Migrate the Redux Store to a higher app version number
 * to prevent breaking changes.
 *
 * @param {String} version
 */
export const migrateStore = version => ({
    type: MIGRATE_STORE,
    version
});
