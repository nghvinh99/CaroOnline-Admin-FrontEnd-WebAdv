import React from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth/sign-in">
          <SignInPage />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
