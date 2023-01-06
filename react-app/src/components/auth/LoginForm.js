import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = (event) => {
    setEmail('demo@aa.io');
    setPassword('password')
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/photos' />;
  }

  return (
    <div className='main'>
      <div className='background-img'>
        <form className="login-form" onSubmit={onLogin}>
          <h3 className='login-head'>Log in to Picture This </h3>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email'>
              {/* Email */}
            </label>
            <input
              name='email'
              type='text'
              placeholder='Email address'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>
              {/* Password */}
            </label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />

          </div>
          <div>
            <button className='login-buttons' type='submit'>Login</button>
          </div>
          <div>
            <button className='login-buttons' onClick={demoUser}>DemoUser Login</button>
          </div>
          <div className='not-member'>
            Not a Picture This member? &nbsp;<NavLink to='/sign-up'> Sign up here</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
