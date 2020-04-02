import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);
  // set alert
  const setAlert = (msg, type, timeOut = 5000) => {
    const id = uuid();
    const alert = setTimeout(e => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeOut);
    dispatch({ type: SET_ALERT, payload: { type, msg, id, alert } });
  };
  const removeAlert = (alert, id) => {
    clearTimeout(alert);
    dispatch({ type: REMOVE_ALERT, payload: id });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
