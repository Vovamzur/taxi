import openSocket from 'socket.io-client';

import { User } from '../../types/user.types';
import { Coordinate } from '../../types/coodrinate.types';
const geoLocationUrl: string = process.env.REACT_APP_SOCKET_GEO_LOCATION_URL || '';
const socket = openSocket(geoLocationUrl);

export const sendLocation = (userId: User['id'], position: Coordinate): void => {
  socket.emit('updatePosition', { userId, position });
};

export const disconnectGeoLocation = (userId: User['id']): void => {
  socket.emit('leave', userId);
}
