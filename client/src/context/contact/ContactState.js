import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Sruly Loefler',
        email: 'hello@email.com',
        phone: '8888888888',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Freidy Weinstock',
        email: 'byby@gmail.com',
        phone: '9999999988',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Sipi Livni',
        email: 'match@gomail.com',
        phone: '4434434488',
        type: 'professional'
      }
    ],
    current: null,
    filtered: null
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);
  const { contacts, current, filtered } = state;

  // Add contact
  const addContact = contact => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete Contact
  const deleteContact = id => dispatch({ type: DELETE_CONTACT, payload: id });
  //Update contact
  const updateContact = contact =>
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  //Set Current contact
  const setCurrent = contact =>
    dispatch({ type: SET_CURRENT, payload: contact });
  //clear current contact
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
  // filter contacts
  const filterContacts = (field, query) =>
    dispatch({ type: FILTER_CONTACTS, payload: { field, query } });
  //clear filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });
  return (
    <ContactContext.Provider
      value={{
        contacts,
        current,
        filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
