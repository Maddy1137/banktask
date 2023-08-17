import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const newUser = { username, email, password };
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();
      if (data.stat === 'success') {
        setMessage('Registration successful. Redirecting to login page...');
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('user', JSON.stringify(data.user));

        // Call the onRegister function to update the user state
        onRegister(data.user);

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='container card shadow d-flex flex-column justify-content-around align-items-center mt-5'>
      <h2 className='mt-5' style={{color:'lightskyblue'}}>Customer Registration Page</h2>
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
        type="text"
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

export default RegistrationPage;
