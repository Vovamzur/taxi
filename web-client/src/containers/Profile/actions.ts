import Cookies from 'js-cookie';
import { feedback } from 'react-feedbacker';

import { SET_USER, SET_IS_LOADING, UserAction, AsyncUserAction, SET_CAR, SET_DRIVER } from './action.types';
import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService';
import { User } from '../../types/user.types';
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
  dispatch(setIsLoading(true))
  try {
    const { user, token } = await authResponsePromise;
    setAuthData(user, token)(dispatch, getRootState);
  } catch (err) {
    feedback.error(err && err.message ? err.message : err);
  } finally {
    dispatch(setIsLoading(false))
  };
}
export const login = (request: LoginCredentials): AsyncUserAction =>
  handleAuthResponse(authService.login(request));

export const registration = (request: RegisterCredentials): AsyncUserAction =>
  handleAuthResponse(authService.registration(request))

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
    if (user!.driver) {
      dispatch(setDriver(user!.driver))
      if (user!.driver.carId) {
        const car = await profileService.getCarById(user!.driver.carId);
        dispatch(setCar(car))
      }
    }
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

export const updateCarOfDriver = (carToUpdate: Car): AsyncUserAction =>
  async (dispatch, getRootState) => {
    dispatch(setIsLoading(true));

    try {
      const { driver } = getRootState().profile
      if (!driver) return
      const carId = driver.car?.id;
      const updatedCar = carId
        ? await profileService.updateCar(carId, carToUpdate)
        : await profileService.createCar(carToUpdate);
      
      if (!updatedCar?.id) return
      const { car, ...driverBody } = driver;
      const updatedDriver = await profileService.updateDriver(driver?.id, {
        ...driverBody,
        carId: updatedCar.id
      })
      dispatch(setDriver(updatedDriver))
      dispatch(setCar(updatedCar))
    } catch (err) {
      feedback.error(err && err.message ? err.message : err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

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
  };

export const updateUser = (userId: User['id'], user: User): AsyncUserAction =>
  async (dispatch, getRootState) => {
    dispatch(setIsLoading(true));

    try {
      await profileService.updateUser(userId, user);
      loadCurrentUser(true)(dispatch, getRootState);
    } catch (err) {
      feedback.error(err && err.message ? err.message : err);
    } finally {
      dispatch(setIsLoading(false));
    }
  }