import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import authReducer from '@reducers/auth';
import settingsReducer from '@reducers/settings';
import timetablesReducer from '@reducers/timetables';

const sensitiveStorage = createSensitiveStorage({
    keychainService: 'myKeychain',
    sharedPreferencesName: 'mySharedPrefs'
});

const timetablesPersistConfig = {
    key: 'timetables',
    blacklist: ['isLoading', 'error'],
    storage: AsyncStorage,
    timeout: 0
};

const settingsPersistConfig = {
    key: 'settings',
    storage: AsyncStorage,
    timeout: 0
};

const authPersistConfig = {
    key: 'auth',
    blacklist: ['isLoading', 'error'],
    storage: sensitiveStorage,
    stateReconciler: hardSet,
    timeout: 0
};

const rootReducer = combineReducers({
    timetables: persistReducer(timetablesPersistConfig, timetablesReducer),
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    auth: persistReducer(authPersistConfig, authReducer)
});

const loggerMiddleware = createLogger();

const middlewares = [thunk];

if (__DEV__) {
    middlewares.push(loggerMiddleware);
}

export default () => {
    const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));
    const persistor = persistStore(store);

    return { store, persistor };
};
