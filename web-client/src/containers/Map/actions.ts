import {
  SET_ACTIVE_DRIVERS,
  SET_ACTIVE_CLIENT,
  SET_OWN_DRIVER,
  SET_ORDER_STATUS,
  SET_CONDITIONAL_RIDE,
  MapAction,
  AsyncMapAction,
} from './actionTypes';
import * as bookingService from 'services/bookingService';
import { setIsLoading } from 'containers/Profile/actions';
import { Coordinate } from 'types/coodrinate.types';
import { User } from 'types/user.types';

const setActiveDrivers = (activeDrivers: Coordinate[]): MapAction => ({
  type: SET_ACTIVE_DRIVERS,
  paylod: activeDrivers,
});

const setActiveClient = (activeClient: User & Coordinate | null): MapAction => ({
  type: SET_ACTIVE_CLIENT,
  payload: activeClient,
});

