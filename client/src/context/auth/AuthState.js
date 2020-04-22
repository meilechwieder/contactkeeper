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
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('userToken'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const { token, isAuthenticated, loading, error, user } = state;
  // load user
  const loadUser = async () => {
    if (localStorage.getItem('userToken')) {
      setAuthToken(localStorage.getItem('userToken'));
    }
    try {
      const res = await axios.get('/api/auth');

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error });
    }
  };
  // register user
  const registerUser = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const url = '/api/users'; //`${process.env.REACT_APP_PROXY}/api/users`;
      const res = await axios.post(url, user, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };
  // login user
  const loginUser = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const url = '/api/auth'; //`${process.env.REACT_APP_PROXY}/api/users`;
      const res = await axios.post(url, user, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };
  // logout
  const logout = () => dispatch({ type: LOGOUT });
  // clear errors
  const clearError = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        error,
        user,
        registerUser,
        clearError,
        loadUser,
        loginUser,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
