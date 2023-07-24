import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './main.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
