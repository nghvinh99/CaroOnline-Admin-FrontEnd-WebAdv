import React from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import Dashboard from './components/Dashboard';
import Cookies from 'js-cookie';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token'));
  { console.log(auth); }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <GuestRoute exact path="/auth/sign-in" component={SignInPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/users" component={Dashboard} content={"Users"} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
