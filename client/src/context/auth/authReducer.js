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

const authReducer = (state, action) => {
  switch (action.typ) {
    case REGISTER_BUTTON:
      return {
        ...state,
        user: action.payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('userToken', action.payload.token);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem('userToken');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
