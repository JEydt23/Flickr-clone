import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import logo from './logotransparentback.png'
// import session from '../../store/session'
import { useSelector } from 'react-redux';
// import createAPhoto from '../CreatePhoto'



import './NavBar.css'



const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <nav>
      <div className='nav'>
        <div className='Home' title="Picture This logo. If you click it, you'll see all photos">
          <NavLink to='/photos' exact={true} activeClassName='active' style={{ textDecoration: "none" }} >
            <img src={logo} alt='home' id='logo' className='logo-props'></img>&nbsp;<label className='picture-this'>Picture This</label>
          </NavLink>
          <div className='explore'>
            <NavLink to='/explore' exact={true} activeClassName='active' className='explore-link' style={{ textDecoration: "none" }}>
              Explore
            </NavLink>
          </div>
        </div>
        <div className='nav-right'>
          <div className='about-me-nav'>
            <NavLink to='/about' exact={true} activeClassName='active' className='aboutMe'>
              About Me
            </NavLink>
          </div>
          {user &&
            <button className='createPhotoButton'>
              <NavLink to='/photos/new' exact={true} activeClassName='active' className='create-a-photo' style={{ textDecoration: "none" }}>
                Upload a Photo
              </NavLink>
            </button>}
          <div >
            {!user &&
              <NavLink to='/login' exact={true} activeClassName='active' className='login' >
                Login
              </NavLink>}
          </div>
          <div >
            {!user &&
              <button className='sign-button'>
                <NavLink to='/sign-up' exact={true} activeClassName='active' className='sign-up'>
                  Sign Up
                </NavLink>
              </button>}
          </div>
          {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
          {user &&
            <div className='username-display'>
              Welcome, {user?.username}!
            </div>}
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
