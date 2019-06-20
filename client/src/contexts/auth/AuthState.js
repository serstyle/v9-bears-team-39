import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

const AuthState = props => {
  const initialState = {
    user: null,
    error: null,
    isAuthenticated: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Regsiter User

  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
