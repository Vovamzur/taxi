import Cookies from 'js-cookie';
import { feedback } from 'react-feedbacker';

import { SET_USER, SET_IS_LOADING, UserAction, AsyncUserAction, SET_CAR, SET_DRIVER } from './action.types';
import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService';
import { history } from './../../store'
import { User, Role } from '../../types/user.types';
import { LoginCredentials, RegisterCredentials } from './../../types/auth.types';
import { Driver, Car } from './../../types/profile.types';

const setToken = (token: string) => localStorage.setItem('token', token);
const clearToken = () => localStorage.removeItem('token');

export const setUser = (user: User | null): UserAction => ({
  type: SET_USER,
  payload: user,
});

const setIsLoading = (isLoading: boolean): UserAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

const setCar = (car: Car): UserAction => ({
  type: SET_CAR,
  payload: car,
})

const setDriver = (driver: Driver): UserAction => ({
  type: SET_DRIVER,
  payload: driver
})

const setAuthData = (user: User, token: string): AsyncUserAction => (dispatch) => {
  setToken(token);
  dispatch(setUser(user));
};

export const logout = (): AsyncUserAction => (dispatch) => {
  clearToken();
  dispatch(setUser(null));
};

const handleAuthResponse = (
  authResponsePromise: Promise<{
    user: User;
    token: string;
  }>,
): AsyncUserAction => async (dispatch, getRootState) => {
  try {
    const { user, token } = await authResponsePromise;
    setAuthData(user, token)(dispatch, getRootState);
  } catch (err) {
    feedback.error(err && err.message ? err.message : err);
  }
};

export const login = (request: LoginCredentials) =>
  handleAuthResponse(authService.login(request));

export const registration = (request: RegisterCredentials): AsyncUserAction => 
  async (dispatch, getRootState) => {
    setIsLoading(true)
    try {
      const { user, token } = await authService.registration(request);
      setAuthData(user, token)(dispatch, getRootState);
      history.push(user.role === Role.DRIVER ? '/car' : '/')
    } catch (err) {
      feedback.error(err && err.message ? err.message : err);
    } finally {
      setIsLoading(false)
    }
  }

const retrieveTokenFromCookie = () => {
  const token = Cookies.get('token');

  if (token) {
    localStorage.setItem('token', token);
    Cookies.remove('token');
  }
};


export const loadCurrentUser = (soft = false): AsyncUserAction => async (dispatch) => {
  if (!soft) {
    dispatch(setIsLoading(true));
  }
  retrieveTokenFromCookie();

  try {
    const user = await authService.getCurrentUser();
    dispatch(setUser(user));
  } catch (err) {
    dispatch(setUser(null));
  } finally {
    if (!soft) {
      dispatch(setIsLoading(false));
    }

    if (window.location.hash === '#_=_') {
      window.location.hash = '';
    }
  }
};

export const updateCarOfDriver = (driverId: Driver['id'], car: Car): AsyncUserAction => 
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const updatedCar = await profileService.updateCar(driverId, car);
      dispatch(setCar(updatedCar))
    } catch (err) {
      feedback.error(err && err.message ? err.message : err);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

export const updateDriver = (driverId: Driver['id'], driver: Driver): AsyncUserAction =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const updatedDriver = await profileService.updateDriver(driverId, driver);
      dispatch(setDriver(updatedDriver))
    } catch (err) {
      feedback.error(err && err.message ? err.message : err);
    } finally {
      dispatch(setIsLoading(false));
    }
  }