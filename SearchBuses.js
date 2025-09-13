import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function SearchBuses() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const search = async () => {
    const res = await api.get(`/search?from=${from}&to=${to}`);
    setResults(res.data.results);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Search Buses</h2>
      <input placeholder="From" value={from} onChange={e => setFrom(e.target.value)} />
      <input placeholder="To" value={to} onChange={e => setTo(e.target.value)} />
      <button onClick={search}>Find</button>
      <ul>
        {results.map(bus => (
          <li key={bus.id}>
            <b>{bus.name}</b> – ETA: {bus.eta} – Seats: {bus.seatsAvailable}
            <button onClick={() => navigate(`/track/${bus.id}`)}>Track</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
