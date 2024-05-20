import React, { useState } from 'react';
import axios from 'axios';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3500/send-email', { email });
      setResponse(res.data.message);
      setError('');
      setOtpSent(true); // Set otpSent to true when OTP is sent
    } catch (error) {
      setError('Error sending email');
      setResponse('');
      setOtpSent(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('OTP is required');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3500/verify-otp', { email, otp });
      setResponse(res.data.message);
      setError('');
    } catch (error) {
      setError('Error verifying OTP');
      setResponse('');
    }
  };

  return (
    <div>
      <h1 id='titlename'>Email Authentication</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='mailname' id='email-label'>Email</label><br />
        <input 
          type='email' 
          id='mail' 
          name='mailname' 
          placeholder='Enter Email Address' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit" id='otp-btn'>Send OTP</button>
      </form>

      {otpSent && (
        <form onSubmit={handleOtpSubmit}>
          <input 
            id='otp-input' 
            type='text' 
            placeholder='Enter OTP' 
            value={otp}
            onChange={(e) => setOtp(e.target.value)} 
          /><br />
          <button type="submit" id='submit-btn'>Submit</button>
        </form>
      )}
      
      {response && <p id='success-message'>{response}</p>}
      {error && <p id='error-message'>{error}</p>}
    </div>
  );
};
