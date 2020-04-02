import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import {
  REGISTER_BUTTON,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const { token, isAuthenticated, loading, error, user } = state;
  // load user

  // register user
  const registerUser = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const url = '.api/users'; //`${process.env.REACT_APP_PROXY}/api/users`;
      console.log(url);
      const res = await axios.post(url, user, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };
  // login user

  // logout

  // clear errors

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        error,
        user,
        registerUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
