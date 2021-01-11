import React from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from './context/auth';
import Dashboard from './components/Dashboard/index';
import { selectFilter, fetchUsers } from './features/users/usersSlice';
import { fetchHistory } from './features/history/historySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const userStatus = useSelector(state => state.users.status);
  const historyStatus = useSelector(state => state.history.status);

  const [auth, setAuth] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers(filter));
    }
    if (historyStatus === 'idle') {
      dispatch(fetchHistory(filter));
    }
  }, [userStatus, dispatch, filter]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Route exact path='/auth/sign-in' component={SignInPage} />
        <Route exact path='/dashboard'>
          <Dashboard content='Users' />
        </Route>
        <Route exact path='/'>
          <Dashboard content='Users' />
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
    </AuthContext.Provider>
  );
}

export default App;
