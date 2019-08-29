export const CHANGE_THEME = 'CHANGE_THEME';
export const MIGRATE_STORE = 'MIGRATE_STORE';

export const setTheme = theme => ({
    type: CHANGE_THEME,
    theme
});

/**
 * Migrate the Redux Store to a higher app version number
 * to prevent breaking changes.
 */
export const migrateStore = () => ({
    type: MIGRATE_STORE
});