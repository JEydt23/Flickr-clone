import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllPhotos from './components/AllPhotos';
import PhotoDetail from './components/PhotoDetails';
import CreatePhoto from './components/CreatePhoto';
import EditPhoto from './components/EditPhoto';
import LandingPage from './components/LandingPage'
import PageNotFound from './components/404Page/404page';
import AboutMe from './components/AboutMe/AboutMe'


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/photos/new' exact={true} >
          <CreatePhoto />
        </Route>
        <Route path='/about' exact={true}>
          <AboutMe />
        </Route>
        <Route path='/photos' exact={true} >
          <AllPhotos />
        </Route>
        <Route path='/photos/:photoId/edit' exact={true}>
          <EditPhoto />
        </Route>
        <Route path='/photos/:photoId' exact={true} >
          <PhotoDetail />
        </Route>
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>
        <Route path='/' >
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
