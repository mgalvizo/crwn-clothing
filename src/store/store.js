// compose lets us add multiple middlewares to work with (multiple functions from left to right)
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

// Combines all our reducers
import { rootReducer } from './rootReducer';

// Technique to show the logger only in development
// If it is false it returns an empty array if true it returns an array with the middleware
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
);

// Works if the redux dev tools extension is installed
const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

// redux-persist config
const persistConfig = {
    key: 'root',
    // Defaults to localStorage
    storage,
    blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// Passes the processed rootReducer as persistedReducer
export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

export const persistor = persistStore(store);
