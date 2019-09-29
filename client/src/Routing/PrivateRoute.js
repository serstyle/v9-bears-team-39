import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/auth/authContext';
import useLoadUser from '../hooks/useLoadUser';
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  useLoadUser();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
