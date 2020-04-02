import React, { useState, useContext, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const { addContact, current, clearCurrent, updateContact } = useContext(
    contactContext
  );

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  let [formChangeEvent, setFormChangeEvent] = useState(false);
  const { name, email, phone, type } = contact;
  const onChange = e => {
    // make the clear form button visible
    setFormChangeEvent(true);
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const clearAll = () => {
    setFormChangeEvent(false);
    clearCurrent();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      if (name === '') return;
      addContact(contact);
    }
    clearAll();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={name}
        id=''
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={email}
        id=''
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='Phone'
        value={phone}
        id=''
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        id='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      <label htmlFor='personal'>Personal</label>{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
        id='professional'
      />
      <label htmlFor='professional'>Professional</label>
      <div>
        <input
          type='submit'
          value={current ? 'Save Contact' : 'Add contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      <div>
        {(current || formChangeEvent) && (
          <button className='btn btn-secondary btn-block' onClick={clearAll}>
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
