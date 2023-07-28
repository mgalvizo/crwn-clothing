// compose lets us add multiple middlewares to work with (multiple functions from left to right)
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Combines all our reducers
import { rootReducer } from './rootReducer';

// Technique to show the logger only in development
// If it is false it returns an empty array if true it returns an array with all the middleware
const middleWares = [
    process.env.NODE_ENV === 'development' && logger,
    thunk,
].filter(Boolean);

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
    whitelist: ['cart'],
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
