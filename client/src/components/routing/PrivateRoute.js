import React, { useContext, useEffect } from 'react';
import { Route, Redirect, Router } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
