import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
  const { contacts, filtered } = useContext(ContactContext);
  const arrayToMap = filtered ? filtered : contacts;
  //prettier-ignore
  return (
    <Fragment>
      <TransitionGroup>
      {(filtered && filtered.length === 0 ) && (
        <h4 style={{ textAlign: 'center' }}>No contacts found</h4>
      )}
      {contacts.length === 0 && (
        <h4 style={{ textAlign: 'center' }}>Please add a contact</h4>
      )}
      {arrayToMap.map(contact => (
        <CSSTransition key={contact.id} timeout={500} classNames={'item'}>
          <ContactItem contact={contact} />
        </CSSTransition>
      
      ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
