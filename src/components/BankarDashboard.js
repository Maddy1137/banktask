import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of users from the backend
    axios.get('http://localhost:8000/users/all')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    navigate('/banker-login');
  };

  return (
    <div className='container card shadow d-flex flex-column justify-content-around  mt-5'>
      <div className='d-flex justify-content-around mt-3 '>
        <span></span>
        <h2 >Banker Dashboard</h2>
        <button className='btn btn-outline-warning' onClick={handleLogout}>Logout</button>
      </div>
      <div className='ml-5' style={{marginLeft:'3rem'}} >
        <h3>Customer</h3>
        <ul>
          {users.map(user => (
            <li key={user.user_id} style={{cursor:'pointer'}} onClick={() => handleUserClick(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div className='card d-flex flex-column justify-content-around p-5 m-5 align-items-center shadow rounded'>
          <h3><span style={{color:'lightskyblue'}}>{selectedUser.username}'s</span> Transactions</h3>
          <ul>
            {selectedUser.transactions.map(transaction => (
              <li key={transaction.transaction_id}>
                Amount: {transaction.amount}, Type: {transaction.transaction_type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
