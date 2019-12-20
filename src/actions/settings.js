export const CHANGE_THEME = 'CHANGE_THEME';
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
 * Migrate the Redux Store to a higher app version number
 * to prevent breaking changes.
 *
 * @param {String} version
 */
export const migrateStore = version => ({
    type: MIGRATE_STORE,
    version
});
