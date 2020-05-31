import openSocket from 'socket.io-client';

const notificationUrl: string = process.env.REACT_APP_SOCKET_BOOKING_URL || '';
export const notificationSocket = openSocket(notificationUrl);
