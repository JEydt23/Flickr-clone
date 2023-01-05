import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import logo from './flickr logo black.png'
import session from '../../store/session'
import { useSelector } from 'react-redux';
import createAPhoto from '../CreatePhoto'



import './NavBar.css'



const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <nav>
      <div className='nav'>
        <div className='Home'>
          <NavLink to='/photos' exact={true} activeClassName='active'>
            <img src={logo} alt='home' id='logo'></img><label class='picture-this'>Picture This</label>
          </NavLink>
        </div>
        <div className='nav-right'>
          {user &&
        <button className='createPhotoButton'>
          <NavLink to={`/photos/new`} className='create-a-photo' onClick={createAPhoto}>
            Upload a Photo
          </NavLink>
        </button>}
          <div >
            <NavLink to='/login' exact={true} activeClassName='active' className='login'>
              Login
            </NavLink>
          </div>
          <div >
            <button className='sign-button'>
              <NavLink to='/sign-up' exact={true} activeClassName='active' className='sign-up'>
                Sign Up
              </NavLink>
            </button>
          </div>
          {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
          <div>
            {user &&
              <LogoutButton />
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
