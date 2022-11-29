import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from "./context/AuthContext";
import './index.css';
import App from './App';
import LocContextProvider from "./context/LocContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <React.StrictMode>
            <LocContextProvider>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
            </LocContextProvider>
        </React.StrictMode>
    </Router>
);


