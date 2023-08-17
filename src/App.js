import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/login";
import RegistrationPage from "./components/register";
import TransactionsPage from "./components/TransactionsPageNew";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser(data);
  };

  const handleRegister = (data) => {
    setUser(data);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<RegistrationPage onRegister={handleRegister} />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/transactions/:username" // Pass username as a parameter
          element={
            user ? (
              <TransactionsPage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;
