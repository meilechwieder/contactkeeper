import React, { useContext, useEffect } from 'react';
import Contacts from '../../contacts/Contacts';
import ContactForm from '../../contacts/ContactForm';
import ContactFilter from '../../contacts/ContactsFilter';
import contactContext from '../../../context/contact/contactContext';
import AuthContext from '../../../context/auth/authContext';

const Home = () => {
  const { loadUser } = useContext(AuthContext);
  const { contacts } = useContext(contactContext);
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        {contacts && contacts.length > 1 && <ContactFilter />}
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
