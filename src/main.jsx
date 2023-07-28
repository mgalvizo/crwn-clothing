import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
// Boilerplate of redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store.js';
import './main.scss';

const container = document.getElementById('root');
const root = createRoot(container);

// Order matters when wrapping components
root.render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>
);
