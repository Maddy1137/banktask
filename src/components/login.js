import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', { username, password });
      const { accessToken, user } = response.data;

      // Store the access token and user data in session storage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('user', JSON.stringify(user));

      // Call the onLogin function to update the user state
      onLogin(user);

      // Navigate to transactions page with username as a parameter
      navigate(`/transactions/${user.username}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else if (error.response && error.response.status === 404) {
        setError('User not found');
      } else {
        setError('An error occurred while logging in');
      }
    }
  };

  return (
    <div className='container card shadow h-50 w-50 mt-5 d-flex flex-column justify-content-center align-items-center'>
      <h2 className='mt-3' style={{color:'lightskyblue'}}>Login Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        className='rounded m-3'
        type="text"
        placeholder="Username or Email"
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

export default LoginPage;
