import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setAuthToken } from './api';

const token = localStorage.getItem('token');
if (token) setAuthToken(token);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
