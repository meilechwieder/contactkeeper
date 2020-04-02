import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const { name, email, phone, type, id } = contact;
  const { deleteContact, setCurrent, clearCurrent } = useContext(
    ContactContext
  );
  const delContact = () => {
    if (window.confirm('Do you want to delete this contact?')) {
      deleteContact(id);
      clearCurrent();
    }
  };
  const setCurr = () => {
    setCurrent(contact);
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={`float-right badge badge-${
            type === 'professional' ? 'success' : 'primary'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fa fa-envelope-open'></i>{' '}
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        )}
        {phone && (
          <li>
            <i className='fa fa-phone'></i>{' '}
            <a href={`tel:${phone}`}>
              {`${phone.substring(0, 3)}.${phone.substring(
                3,
                6
              )}.${phone.substring(6)}`}
            </a>
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-small' onClick={setCurr}>
          Edit
        </button>
        <button className='btn btn-danger btn-small' onClick={delContact}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.PropType = {
  contact: PropTypes.object.isRequired
};
export default ContactItem;
