import openSocket from 'socket.io-client';

import store from 'store';
import { setActiveDrivers } from 'containers/Map/actions';
import { User } from '../../types/user.types';
import { Coordinate } from '../../types/coodrinate.types';

const geoLocationUrl: string = process.env.REACT_APP_SOCKET_GEO_LOCATION_URL || '';
const geoSocket = openSocket(geoLocationUrl);

geoSocket.on('activeDrivers', (activeDrivers: Coordinate[]) => {
  store.dispatch(setActiveDrivers(activeDrivers));
});

export const sendLocation = (userId: User['id'], position: Coordinate): void => {
  geoSocket.emit('updatePosition', { userId, position });
};

export const disconnectGeoLocation = (userId: User['id']): void => {
  geoSocket.emit('leave', userId);
}

export const getNearestDrivers = (userId: User['id'], userCoordinate: Coordinate): void => {
  geoSocket.emit('nearestDrivers', { userId, userCoordinate });
}
