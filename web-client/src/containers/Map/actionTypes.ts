import { Thunky } from 'store/types';
import { Coordinate } from 'types/coodrinate.types';
import { Driver } from 'types/profile.types';
import { User } from 'types/user.types';
import { OrderStatus } from 'types/order.types';
import { ConditionaRide } from './reducer';

export const SET_IS_LOADING = 'MAP_ACTION:SET_IS_LOADING';
export const SET_ACTIVE_DRIVERS = 'MAP_ACTION:FETCH_ACTIVE_DRIVERS';
export const SET_ACTIVE_CLIENT = 'MAP_ACTION:SET_ACTIVE_CLIENT'
export const SET_OWN_DRIVER = 'MAP_ACTION:SET_OEN_DRIVER';
export const SET_ORDER_STATUS = 'MAP_ACTIONS:SET_ORDER_STATUS';
export const SET_CONDITIONAL_RIDE = 'MAP_ACTION:SET_CONDITIONAL_RIDE';

type SetActiveDrivers = {
  type: typeof SET_ACTIVE_DRIVERS,
  paylod: Coordinate[];
};

type SetOwnDriver = {
  type: typeof SET_OWN_DRIVER,
  payload: Driver | null
};

type SetActiveClient = {
  type: typeof SET_ACTIVE_CLIENT,
  payload: User & Coordinate | null
};

type SetOrderStatus = {
  type: typeof SET_ORDER_STATUS,
  payload: OrderStatus
};

type SetCoditionalRide = {
  type: typeof SET_CONDITIONAL_RIDE,
  payload: ConditionaRide | null,
};

type SetIsLoading = {
  type: typeof SET_IS_LOADING,
  payload: boolean
};

export type MapAction =
 | SetActiveDrivers
 | SetActiveClient
 | SetOwnDriver
 | SetOrderStatus
 | SetCoditionalRide
 | SetIsLoading

export type AsyncMapAction = Thunky<MapAction>;
