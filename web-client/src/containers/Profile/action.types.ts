import { User } from '../../types/user.types';
import { Thunky } from '../../store/types';
import { Driver, Car } from 'types/profile.types';

export const SET_USER = 'PROFILE_ACTION:SET_USER';
export const SET_IS_LOADING = 'PROFILE_ACTION:SET_IS_LOADING';
export const SET_DRIVER = 'PROFILE_ACTION:SET_DRIVER';
export const SET_CAR = 'PROFILE_ACTION:SET_CAR';

type SetUser = {
  type: typeof SET_USER;
  payload: User | null;
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

type SetDriver = {
  type: typeof SET_DRIVER;
  payload: Driver | null;
}

type SetCar = {
  type: typeof SET_CAR;
  payload: Car  | null
}

export type UserAction =
  | SetUser
  | SetLoading
  | SetDriver
  | SetCar
export type AsyncUserAction = Thunky<UserAction>;
