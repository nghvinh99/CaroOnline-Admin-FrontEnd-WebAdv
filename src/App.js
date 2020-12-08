import React from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import Dashboard from './components/Dashboard';
import Cookies from 'js-cookie';
import { useState } from 'react';

function App() {
  const logIn = Cookies.get('Login');
  const [auth, setAuth] = useState(logIn);

  const flipAuth = () => {
    setAuth(!auth);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth: flipAuth }}>
      <Router>
        <GuestRoute exact path="/auth/sign-in" component={SignInPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/" component={Dashboard} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
