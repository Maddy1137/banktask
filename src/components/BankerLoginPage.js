import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BankerLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/banker/login', { username, password });
      const { accessToken, user } = response.data;

      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('user', JSON.stringify(user));

      // Redirect to admin dashboard
      navigate('/banker/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='container card shadow h-50 w-50 mt-5 d-flex flex-column justify-content-center align-items-center'>
      <h2 className='mt-3' style={{color:'lightskyblue'}}>Banker Login Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
      className='rounded m-3'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
      className='rounded m-3'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='btn btn-outline-success m-3' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default BankerLoginPage;
