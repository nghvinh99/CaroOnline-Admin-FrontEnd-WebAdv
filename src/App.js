import React from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from './context/auth';
import Dashboard from './components/Dashboard/index';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token'));

  const login = () => {
    setAuth(true);
  }

  const logout = () => {
    setAuth(false);
    localStorage.clear();
  }

  const check = () => {
    return localStorage.getItem('token');
  }

  return (
    <AuthContext.Provider value={{ auth: auth, login: login, logout: logout, check: check }}>
      <Router>
        <Route exact path='/auth/sign-in' component={SignInPage} />

        <Route exact path='/dashboard'>
          <Dashboard content='Home' />
        </Route>
        <Route exact path='/'>
          <Dashboard content='Home' />
        </Route>
        <Route exact path='/auth/profile' >
          <Dashboard content='Profile' />
        </Route>
        <Route exact path='/dashboard/users'>
          <Dashboard content='Users' />
        </Route>
        <Route exact path='/dashboard/users/:id'>
          <Dashboard content='UserDetails' />
        </Route>
        <Route exact path='/dashboard/history'>
          <Dashboard content='History' />
        </Route>
        <Route exact path='/dashboard/history/boards/:id'>
          <Dashboard content='HistoryDetails' />
        </Route>
      </Router>
    </AuthContext.Provider >
  );
}

export default App;
