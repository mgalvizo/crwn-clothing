// compose lets us add multiple middlewares to work with (multiple functions from left to right)
import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
// Combines all our reducers
import { rootReducer } from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
};

// redux-persist config
const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    // Defaults to localStorage
    storage,
    whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Technique to show the logger only in development
// If it is false it returns an empty array if true it returns an array with all the middleware
const middleWares = [
    import.meta.env.MODE === 'development' && logger,
    sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// Works if the redux dev tools extension is installed
const composeEnhancer =
    (import.meta.env.MODE !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// Passes the processed rootReducer as persistedReducer
export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
