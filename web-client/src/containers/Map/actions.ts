import { feedback } from 'react-feedbacker';

import {
  SET_ACTIVE_DRIVERS,
  SET_ACTIVE_CLIENT,
  SET_OWN_DRIVER,
  SET_ORDER_STATUS,
  SET_CONDITIONAL_RIDE,
  SET_IS_LOADING,
  MapAction,
  AsyncMapAction,
} from './actionTypes';
import * as bookingService from 'services/bookingService';
import { Coordinate } from 'types/coodrinate.types';
import { User } from 'types/user.types';
import { Driver } from 'types/profile.types';
import { OrderStatus } from 'types/order.types';
import { ConditionaRide } from './reducer';

const setIsLoading = (isLoading: boolean): MapAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
}) 

export const setActiveDrivers = (activeDrivers: Coordinate[]): MapAction => ({
  type: SET_ACTIVE_DRIVERS,
  paylod: activeDrivers,
});

const setActiveClient = (activeClient: User & Coordinate | null): MapAction => ({
  type: SET_ACTIVE_CLIENT,
  payload: activeClient,
});

const setOwnDriver = (ownDriver: Driver | null): MapAction => ({
  type: SET_OWN_DRIVER,
  payload: ownDriver,
});

const setOrderStatus = (status: OrderStatus): MapAction => ({
  type: SET_ORDER_STATUS,
  payload: status,
});

export const setConditionalRide = (ride: ConditionaRide | null): MapAction => ({
  type: SET_CONDITIONAL_RIDE,
  payload: ride,
});

