import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SearchBuses from './components/SearchBuses';
import BusTracker from './components/BusTracker';
import { setAuthToken } from './api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (tk) => {
    setToken(tk);
    localStorage.setItem('token', tk);
    setAuthToken(tk);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/search" /> : <Login onLogin={handleLogin} />} />
        <Route path="/search" element={token ? <SearchBuses /> : <Navigate to="/" />} />
        <Route path="/track/:busId" element={token ? <BusTracker /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
