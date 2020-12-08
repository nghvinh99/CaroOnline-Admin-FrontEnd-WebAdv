import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from './context/auth';
import { useHistory } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = useAuth();
  const history = useHistory();

  if (!auth) {
    history.push('/auth/sign-in');
  }
  return (
    <Route {...rest} render={props =>
      <Component {...props} />
    } />
  )
}