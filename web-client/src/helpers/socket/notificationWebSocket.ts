import openSocket from 'socket.io-client';

import store from 'store';
import { setConditionalRide } from 'containers/Map/actions';
import { ConditionaRide } from 'containers/Map/reducer';

const notificationUrl: string = process.env.REACT_APP_SOCKET_WEB_NOTIFICATION_URL || '';
const notificationSocket = openSocket(notificationUrl);

notificationSocket.on(`${notificationSocket.id}new-order`, (conditionaRide: ConditionaRide) => {
  store.dispatch(setConditionalRide(conditionaRide));
});
