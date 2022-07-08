import React, { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToneProvider } from './context/ToneContext';
import { SongProvider } from './context/SongContext';
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';
import './styles/_globals.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <AuthProvider>
            <Router>
                <SongProvider>
                    <ToneProvider>
                        <App />
                    </ToneProvider>
                </SongProvider>
            </Router>
        </AuthProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
