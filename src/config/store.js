import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '@reducers';

const loggerMiddleware = createLogger({
    predicate: (getState, action) => action.type !== 'Navigation/COMPLETE_TRANSITION',
    collapsed: (getState, action) => action.type.includes('Navigation/'),
});

const middlewares = [
    thunk.withExtraArgument(getFirebase),
];

if (__DEV__) {
    middlewares.push(loggerMiddleware);
}

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
);

export default store;