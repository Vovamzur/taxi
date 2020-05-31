import { feedback } from 'react-feedbacker';

import {
  SET_ACTIVE_DRIVERS,
  SET_ACTIVE_CLIENT,
  SET_OWN_DRIVER,
  SET_ORDER_STATUS,
  SET_CONDITIONAL_RIDE,
  SET_IS_LOADING,
  SET_DRIVER_INFO,
  NULIFY_STATE,
  MapAction,
  AsyncMapAction,
} from './actionTypes';
import * as bookingService from 'services/bookingService';
import { Coordinate } from 'types/coodrinate.types';
import { User } from 'types/user.types';
import { Driver } from 'types/profile.types';
import { OrderStatus } from 'types/order.types';
import { ConditionaRide } from './reducer';
import { OrderProps } from 'types/order.types';
import { notificationSocket } from 'helpers/socket/bookingSocket';
import { DriverInfo } from './reducer';

const setIsLoading = (isLoading: boolean): MapAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
})

export const nulifyState = (): MapAction => ({
  type: NULIFY_STATE
})

export const setActiveDrivers = (activeDrivers: Array<Coordinate & { userId: string }>): MapAction => ({
  type: SET_ACTIVE_DRIVERS,
  paylod: activeDrivers,
});

const setActiveClient = (activeClient: DriverInfo | null): MapAction => ({
  type: SET_ACTIVE_CLIENT,
  payload: activeClient,
});

const setOwnDriver = (ownDriver: Driver | null): MapAction => ({
  type: SET_OWN_DRIVER,
  payload: ownDriver,
});

export const setOrderStatus = (status: OrderStatus): MapAction => ({
  type: SET_ORDER_STATUS,
  payload: status,
});

export const setConditionalRide = (ride: ConditionaRide | null): MapAction => ({
  type: SET_CONDITIONAL_RIDE,
  payload: ride,
});

export const setDriverInfo = (driverInfo: DriverInfo): MapAction => ({
  type: SET_DRIVER_INFO,
  payload: driverInfo
})

export const setConditionalRideAsync = (ride: ConditionaRide): AsyncMapAction =>
  async (dispatch) => dispatch(setConditionalRide(ride))

export const bookTrip = ({ userId, from, to }: any): AsyncMapAction =>
  async (dispatch) => {
    const order = await bookingService.bookTrip({
      userId,
      from,
      to,
      clientSocketId: notificationSocket.id
    });

    if (order.sucess) {
      localStorage.setItem('orderId', order.newOrderId);
      feedback.success('Booked')
      dispatch(setOrderStatus(OrderStatus.PENDING))
    }
  };

export const acceptOrder = (
  { orderId, driverSocketId, fio, userId }:
    { orderId: string, driverSocketId: string, fio: string, userId: string }
): AsyncMapAction =>
  async (dispatch, getRootState) => {
    dispatch(setIsLoading(true))
    try {
      const result = await bookingService.acceptOrder({ orderId, driverSocketId, fio, userId });
      if (result.success) {
        const { conditionalRide } = getRootState().map
        if (!conditionalRide) return
        const { userFio, userId } = conditionalRide
        dispatch(setOrderStatus(OrderStatus.SUBMITED));
        dispatch(setActiveClient({ fio: userFio, userId }))
        dispatch(setConditionalRide(null));
      }
    } catch (err) {
      feedback.error(err.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  };

export const cancelOrderAction = ({ orderId }): AsyncMapAction => async (dispatch) => {
  dispatch(setIsLoading(true))
  try {
    const result = await bookingService.cancelOrder({ orderId });
    if (!result.success) return
    dispatch(nulifyState());
  } catch (err) {
    feedback.error(err.message)
  } finally {
    dispatch(setIsLoading(false))
  }
}
