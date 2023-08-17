import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BankerRegistrationPage from './components/BankerRegistrationPage';
import BankerLoginPage from './components/BankerLoginPage';
import BankerDashboard from './components/BankarDashboard';
import UserTransactionDetails from './components/UserTransactionDetails'; // Import your UserTransactionDetails component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BankerRegistrationPage />} />
          <Route path="/banker/login" element={<BankerLoginPage />} />
          <Route path="/banker/dashboard" element={<BankerDashboard />} />
          <Route path="/banker/dashboard/:userId" element={<UserTransactionDetails />} /> {/* UserTransactionDetails route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
