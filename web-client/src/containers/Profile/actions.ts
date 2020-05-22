import { feedback } from 'react-feedbacker';

import { SET_USER, SET_IS_LOADING, UserAction, AsyncUserAction } from './action.types';
import { User } from './../../types/user.type';
import * as authService from '../../services/authService';

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

const setAuthData = (user: User, token: string): AsyncUserAction => (dispatch) => {
  setToken(token);
  dispatch(setUser(user));
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

export const registration = (request: RegisterCredentials) =>
  handleAuthResponse(authService.registration(request));
