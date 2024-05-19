import React, { useState } from 'react';
import axios from 'axios';

export const Signup = () => {

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    try {
      const res = await axios.post('http://localhost:3500/send-email', { email });
      setResponse(res.data.message);
    } catch (error) {
      setResponse('Error sending email');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3500/verify-otp', { email, otp });
      setResponse(res.data.message);
    } catch (error) {
      setResponse('Error verifying OTP');
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
        <button type="submit" id='otp-btn'>Send Otp</button>
      </form>
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
      {response && <p>{response}</p>}
    </div>
  );
}
