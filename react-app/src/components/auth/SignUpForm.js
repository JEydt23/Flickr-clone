import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(()=> {
    const validation = []
    if (!email.includes('@') || !email.includes('.')) validation.push('Must provide a valid email address.')
    if (password !== repeatPassword) validation.push('Passwords must match.')
    if (password.length < 6) validation.push('Password must be at least 6 characters.')
    if (repeatPassword.length < 6) validation.push('Confirm Password must be at least 6 characters.')
    setErrors(validation)
  }, [email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/photos' />;
  }

  return (
    <div className='main'>
      <div className='background-img'>
        <form className='signup-form' onSubmit={onSignUp}>
          <h3 className='signup-head'>Sign up for Picture This</h3>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label>
              {/* First name */}
            </label>
            <input
              type='text'
              name='first_name'
              placeholder='First name'
              onChange={updateFirstName}
              value={first_name}
              required
            ></input>
          </div>
          <div>
            <label>
              {/* Last name */}
            </label>
            <input
              type='text'
              name='last_name'
              placeholder='Last name'
              onChange={updateLastName}
              value={last_name}
              required
            ></input>
          </div>
          <div>
            <label>
              {/* User Name */}
            </label>
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={updateUsername}
              value={username}
              required
            ></input>
          </div>
          <div>
            <label>
              {/* Email */}
            </label>
            <input
              type='text'
              name='email'
              placeholder='Email address'
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div>
            <label>
              {/* Password */}
            </label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div>
            <label>
              {/* Repeat Password */}
            </label>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}

            ></input>
          </div>
          <button className='signup-buttons' type='submit'>Sign Up</button>
          <div className='not-member'>
            Already a member? &nbsp; <NavLink to='/login'>Log in here</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
