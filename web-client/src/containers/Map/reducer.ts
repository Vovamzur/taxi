import {
  SET_ACTIVE_DRIVERS,
  SET_ACTIVE_CLIENT,
  SET_OWN_DRIVER,
  SET_ORDER_STATUS,
  MapAction
} from './actionTypes';
import { Driver } from 'types/profile.types';
import { User } from 'types/user.types';
import { OrderStatus } from 'types/order.types';
import { Coordinate } from 'types/coodrinate.types';

export type ConditionaRide = {
  from: Coordinate,
  to: Coordinate
};

type State = {
  activeDrivers: Coordinate[],
  ownDriver: Driver | null,
  activeClient: User & Coordinate | null,
  orderStatus: OrderStatus,
  conditionalRide: ConditionaRide | null,
};

const initialState: State = {
  activeDrivers: [],
  ownDriver: null,
  activeClient: null,
  orderStatus: OrderStatus.NONE,
  conditionalRide: null,
};

export default (state = initialState, action: MapAction): State => {
  switch(action.type) {
    case SET_ACTIVE_DRIVERS:
      return {
        ...state,
        activeDrivers: action.paylod
      }
    
    case SET_OWN_DRIVER:
      return {
        ...state,
        ownDriver: action.payload
      }

    case SET_ACTIVE_CLIENT:
      return {
        ...state,
        activeClient: action.payload
      }

    case SET_ORDER_STATUS:
      return {
        ...state,
        orderStatus: action.payload
      }

    default:
      return state
  }
};
