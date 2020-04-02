import React, { useContext, useRef, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactsFilter = () => {
  const { filterContacts, clearFilter, filtered } = useContext(contactContext);
  const query = useRef('');
  const onChange = () => {
    if (query.current.value !== '') {
      filterContacts('name', query.current.value);
    } else {
      clearFilter();
    }
  };

  useEffect(() => {
    if (!filtered) {
      query.current.value = '';
    }
  }, [query]);
  return (
    <form>
      <input
        style={{ marginTop: 0 }}
        type='text'
        ref={query}
        placeholder='Search contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactsFilter;
