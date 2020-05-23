import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { loadCurrentUser } from './../Profile/actions'

import PrivateRoute from 'containers/PrivateRoute';
import GuestRoute from 'containers/GuestRoute';
import LoginPage from 'containers/Auth/Login'
import RegistrationPage from 'containers/Auth/Registration';
import MainPage from 'containers/MainPage';

import Spinner from 'components/Spinner';
import Header from 'components/Header';

import NotFound from 'scenes/NotFound';

import { RootState } from 'store/types';

const Routing = () => {
  const dispatch = useDispatch();
  const {
    isLoading, user, isAuthorized
  } = useSelector((state: RootState) => state.profile);
  const token = localStorage.getItem('token');
  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  if (isLoading || (token && !isAuthorized)) {
    debugger
    return <Spinner />;
  };

  return (
    <div className='flex h-screen h-full font-sans font-medium'>
      <Switch>
        <GuestRoute exact path='/login' component={LoginPage} />
        <GuestRoute exact path='/registration' component={RegistrationPage} />
        <Route exact path='/404' component={NotFound} />

        <PrivateRoute path='/'>
          <div>
            <Header username={user ? user.email : ''} />
            <main>
              <Switch>
                <Route path='/' component={MainPage} />

                <Route render={() => <Redirect to='/404' />} />
              </Switch>
            </main>
          </div>
        </PrivateRoute>

        <Route render={() => <Redirect to='/404' />} />
      </Switch>
    </div>
  )
};

export default Routing;
