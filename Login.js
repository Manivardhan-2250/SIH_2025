import React, { useState } from 'react';
import api from '../api';

export default function Login({ onLogin }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [role] = useState('citizen');

  const sendOtp = async () => {
    await api.post('/auth/send-otp', { phone, role });
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await api.post('/auth/verify-otp', { phone, otp });
    onLogin(res.data.token);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      {step === 1 && (
        <>
          <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}
