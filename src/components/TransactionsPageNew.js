import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TransactionsPage = ({ user }) => {
  const { username } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [insufficientFunds, setInsufficientFunds] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/transactions/${user.user_id}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchUserBalance = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/balance/${user.user_id}`);
      setUserBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching user balance:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchUserBalance();
  }, [user.userId]);

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleDeposit = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/deposit/${user.user_id}`, {
        amount: depositAmount,
      });
      console.log('Deposit response:', response.data);
  
      fetchTransactions();
      fetchUserBalance();
      setShowDepositModal(false);
    } catch (error) {
      console.error('Error depositing:', error);
    }
  };

  const handleWithdraw = async () => {
    // Convert withdrawAmount to a number
    const withdrawAmountNumber = parseFloat(withdrawAmount);
  
    if (withdrawAmountNumber > userBalance) {
      setInsufficientFunds(true);
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:8000/api/withdraw/${user.user_id}`, {
        amount: withdrawAmountNumber, // Send the converted amount
      });
      console.log('Withdrawal response:', response.data);
  
      fetchTransactions();
      fetchUserBalance();
      setShowWithdrawModal(false);
      setInsufficientFunds(false);
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };
  

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center card rounded mt-5 shadow '>
      <div className='container d-flex justify-content-around mt-3 align-items-center text-center'>
        <span></span>
        <h2>Welcome,<span style={{color:'lightskyblue'}}> {username}</span></h2>
        <button className='btn btn-outline-warning ' onClick={handleLogout}>Logout</button>
      </div>
      <div className='text-center mt-5'>
      <h3>Transaction History:</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.transaction_id}>
            {transaction.transaction_type === 'Deposit' ? 'Deposited' : 'Withdrawn'} ${transaction.amount}
          </li>
        ))}
      </ul>
      </div>
      
      <div className='d-flex justify-content-center p-3 m-4'>
        <button className='btn m-2 btn-outline-primary' onClick={() => setShowDepositModal(true)}>Deposit</button>
        <button className='btn m-2 btn-outline-success' onClick={() => setShowWithdrawModal(true)}>Withdraw</button>
      </div>

      {showDepositModal && (
        <div className="modal container d-flex h-50 w-50 text-center justify-content-center align-item-center card shadow" style={{zIndex:'1000'}}>
          <h3>Deposit Money</h3>
          <p>Available Balance: ${userBalance}</p>
          <div className='d-flex flex-column justify-content-around text-center m-4'>
          <input
            className='rounded'
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <div className='d-flex justify-content-center text-center m-4'>
            <button className='btn m-2 btn-outline-primary' onClick={handleDeposit}>Deposit</button>
            <button className='btn m-2 btn-outline-secondary' onClick={() => setShowDepositModal(false)}>Cancel</button>
          </div>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="modal container d-flex h-50 w-50 text-center justify-content-center align-item-center card shadow">
          <h3>Withdraw Money</h3>
          <p>Available Balance: ${userBalance}</p>
          {insufficientFunds && <p style={{ color: 'red' }}>Insufficient Funds</p>}
          <div className='d-flex flex-column justify-content-center text-center m-4'>
          <input
            className='rounded'
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <div className='d-flex justify-content-center text-center m-4'>

          <button className='btn m-2 btn-outline-primary' onClick={handleWithdraw}>Withdraw</button>
          <button className='btn m-2 btn-outline-secondary' onClick={() => setShowWithdrawModal(false)}>Cancel</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
