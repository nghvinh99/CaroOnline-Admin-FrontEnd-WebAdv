import React from 'react';
import { Route } from "react-router-dom";
import { useAuth } from './context/auth';
import { useHistory } from 'react-router-dom';

function PrivateRoute({ component: Component, content, ...rest }) {
  const { auth } = useAuth();
  const history = useHistory();

  if (!auth) {
    history.push('/auth/sign-in');
  }

  return (
    <Route {...rest}
      render={(props) => {
        return <Component content={content} {...props} />
      }}
    />
  )
}

export default PrivateRoute;