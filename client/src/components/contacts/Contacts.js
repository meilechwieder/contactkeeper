import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const { contacts, filtered, getContacts, loading } = useContext(
    ContactContext
  );

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  const arrayToMap = filtered ? filtered : contacts;
  //prettier-ignore

  return (
    <Fragment>
      {console.log(contacts,loading)}
      {contacts?( <TransitionGroup>
      {(filtered && filtered.length === 0 ) && (
        <h4 style={{ textAlign: 'center' }}>No contacts found</h4>
      )}
      {(contacts && contacts.length === 0 && !loading ) && (
        <h4 style={{ textAlign: 'center' }}>Please add a contact</h4>
      )}
      {arrayToMap.map(contact => (
        <CSSTransition key={contact._id} timeout={500} classNames={'item'}>
          <ContactItem contact={contact} />
        </CSSTransition>
      
      ))}
      </TransitionGroup>): <Spinner/>  }
     
    </Fragment>
  );
};

export default Contacts;
