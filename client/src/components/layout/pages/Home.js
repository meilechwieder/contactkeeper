import React, { useContext } from 'react';
import Contacts from '../../contacts/Contacts';
import ContactForm from '../../contacts/ContactForm';
import ContactFilter from '../../contacts/ContactsFilter';
import contactContest from '../../../context/contact/contactContext';
import contactContext from '../../../context/contact/contactContext';

const Home = () => {
  const { contacts } = useContext(contactContext);
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        {contacts.length > 1 && <ContactFilter />}
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
