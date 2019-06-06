import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { authReducer, timetablesReducer } from './reducers';

const sensitiveStorage = createSensitiveStorage({
    keychainService: 'myKeychain',
    sharedPreferencesName: 'mySharedPrefs'
});

const timetablesPersistConfig = {
    key: 'timetables',
    blacklist: [ 'isLoading', 'error', 'data' ],
    storage: AsyncStorage
}

const authPersistConfig = {
    key: 'auth',
    blacklist: ['isLoading', 'error'],
    storage: sensitiveStorage,
    stateReconciler: hardSet
};

const rootReducer = combineReducers({
    timetables: persistReducer(timetablesPersistConfig, timetablesReducer),
    auth: persistReducer(authPersistConfig, authReducer)
});

const loggerMiddleware = createLogger();

const middlewares = [
    thunk
];

if (__DEV__) {
    middlewares.push(loggerMiddleware);
}

export default () => {
    const store = createStore(
        rootReducer,
        {},
        applyMiddleware(...middlewares)
    );
    const persistor = persistStore(store);

    return { store, persistor }
};