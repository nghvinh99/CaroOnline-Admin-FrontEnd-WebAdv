import React from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import Dashboard from './components/Dashboard/index11';
import UserDetails from './components/Users/UserDetails';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <GuestRoute exact path="/auth/sign-in" component={SignInPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/users" component={Dashboard} content={"Users"} />
        <PrivateRoute exact path="/dashboard/users/:id" component={Dashboard} content={"UserDetails"} />
        <PrivateRoute exact path="/dashboard/history" component={Dashboard} content={"UserDetails"} />
        <PrivateRoute exact path="/dashboard/history/boards/:id" component={Dashboard} content={"UserDetails"} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
