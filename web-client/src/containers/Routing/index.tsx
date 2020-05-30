import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { loadCurrentUser } from './../Profile/actions'

import PrivateRoute from 'containers/PrivateRoute';
import GuestRoute from 'containers/GuestRoute';
import LoginPage from 'containers/Auth/Login'
import RegistrationPage from 'containers/Auth/Registration';
import MainPage from 'containers/MainPage';
import CarPage from 'containers/CarPage';
import ProfilePage from 'containers/Profile'

import Spinner from 'components/Spinner';
import Header from 'components/Header';

import NotFound from 'scenes/NotFound';

import { RootState } from 'store/types';

const Routing = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { profile, map } = useSelector((state: RootState) => state);
  const { user, isAuthorized } = profile;
  const isLoading = profile.isLoading || map.isLoading;

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch, token]);

  if (isLoading || (token && !isAuthorized)) {
    return <Spinner />;
  };

  return (
    <Switch>
      <GuestRoute exact path='/login' component={LoginPage} />
      <GuestRoute exact path='/registration' component={RegistrationPage} />
      <Route exact path='/404' component={NotFound} />

      <PrivateRoute path='/'>
        <div>
          <Header username={user ? user.email : ''} />
          <main>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route path='/car' component={CarPage} />
              <Route path='/profile' component={ProfilePage} />

              <Route render={() => <Redirect to='/404' />} />
            </Switch>
          </main>
        </div>
      </PrivateRoute>

      <Route render={() => <Redirect to='/404' />} />
    </Switch>
  )
};

export default Routing;
