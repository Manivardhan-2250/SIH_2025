import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import api from '../api';

const socket = io(process.env.REACT_APP_API_BASE);

export default function BusTracker() {
  const { busId } = useParams();
  const [pos, setPos] = useState(null);
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    async function fetchInitial() {
      const res = await api.get(`/buses/${busId}`);
      if (res.data.last) setPos([res.data.last.lat, res.data.last.lng]);
    }
    fetchInitial();
    socket.emit('subscribe_bus', { busId: Number(busId) });
    socket.on('position', p => {
      if (p.busId === Number(busId)) {
        setPos([p.lat, p.lng]);
        setSpeed(p.speed);
      }
    });
    return () => socket.emit('unsubscribe_bus', { busId: Number(busId) });
  }, [busId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Bus Tracker</h2>
      {pos ? (
        <p>
          Lat: {pos[0].toFixed(5)}, Lng: {pos[1].toFixed(5)} – Speed: {speed ?? '?'} km/h
        </p>
      ) : (
        <p>Loading bus position…</p>
      )}
    </div>
  );
}
