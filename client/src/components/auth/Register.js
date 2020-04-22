import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {
  const { setAlert } = useContext(AlertContext);
  const {
    registerUser,
    error,
    clearError,
    loading,
    isAuthenticated
  } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearError();
    }
    // eslint-disabled-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (
      password2 === '' ||
      email === '' ||
      password2 === '' ||
      password === ''
    ) {
      setAlert('ALl fields are required', 'danger');
    } else if (password2 !== password) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser(user);
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <p style={{ textAlign: 'center' }}>
        <Link to='/login'>Login instead</Link>
      </p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Reenter Password</label>
          <input
            type='password'
            name='password2'
            id='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
          disabled={!loading}
        />
      </form>
    </div>
  );
};

export default Register;
