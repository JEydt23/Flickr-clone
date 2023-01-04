import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import logo from './flickr logo black.png'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <div className='nav'>
        <div className='Home'>
          <NavLink to='/photos' exact={true} activeClassName='active'>
            <img src={logo} alt='home' id='logo'></img><label>Picture This</label>
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;