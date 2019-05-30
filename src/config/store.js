import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
    blacklist: ['dsb'],
    timeout: 0
};

const loggerMiddleware = createLogger({
    predicate: (getState, action) => action.type !== 'Navigation/COMPLETE_TRANSITION',
    collapsed: (getState, action) => action.type.includes('Navigation/'),
});

const middlewares = [
    thunk
];

if (__DEV__) {
    middlewares.push(loggerMiddleware);
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    const store = createStore(
        persistedReducer,
        {},
        applyMiddleware(...middlewares)
    );
    const persistor = persistStore(store);

    return { store, persistor }
};