import openSocket from 'socket.io-client';

import { User } from '../../types/user.types';
import { Coordinate } from '../../types/coodrinate.types';
const geoLocationUrl: string = process.env.SOCKET_GEO_LOCATION_URL || '';
const socket = openSocket(geoLocationUrl);

export const sendLocation = (userID: User['id'], position: Coordinate) => {
  socket.emit('setPosition', { userID, position });
};
