import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom'


const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    await history.push(`/`);
  };

  return <button className='logout' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
