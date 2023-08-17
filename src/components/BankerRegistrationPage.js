import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BankerRegistrationPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/banker/register', {
        username,
        email,
        password,
      });
      setMessage('Successfully registered');
      setUsername('');
      setEmail('');
      setPassword('');

      // Navigate to login page after successful registration
      navigate('/banker/login'); // Use the navigate function to navigate
    } catch (error) {
      setMessage('Error occurred while registering');
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='container card shadow d-flex flex-column justify-content-around align-items-center mt-5'>
      <h2 className='mt-5' style={{color:'lightskyblue'}}>Banker Registration</h2>
      {message && <p>{message}</p>}
      <input
       className='rounded m-3'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
       className='rounded m-3'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
       className='rounded m-3'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='btn btn-outline-success m-3' onClick={handleRegister}>Register</button>
    </div>
  );
};

export default BankerRegistrationPage;
