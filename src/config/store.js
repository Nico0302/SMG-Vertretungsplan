import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { authReducer, reducers } from './reducers';

const sensitiveStorage = createSensitiveStorage({
    keychainService: 'myKeychain',
    sharedPreferencesName: 'mySharedPrefs'
});

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['auth']
};

const authPersistConfig = {
    key: 'auth',
    storage: sensitiveStorage
};

const rootReducer = combineReducers({
    ...reducers,
    auth: persistReducer(authPersistConfig, authReducer)
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const loggerMiddleware = createLogger();

const middlewares = [
    thunk
];

if (__DEV__) {
    middlewares.push(loggerMiddleware);
}

export default () => {
    const store = createStore(
        persistedReducer,
        {},
        applyMiddleware(...middlewares)
    );
    const persistor = persistStore(store);

    return { store, persistor }
};