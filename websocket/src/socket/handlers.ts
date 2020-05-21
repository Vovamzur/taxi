import { Socket } from 'socket.io';
import * as events from './../config/sockerEvents';
import * as rooms from './../config/socketRooms';
import {
  createOrderConsumer, submitOrderConsumer, cancelOrderConsumer,
} from './../kafka/comsumers';

type User = {
  id: string,
  role: 'CLIENT' | 'DRIVER',
};

const drivers = new Set<User['id']>();
const clients = new Set<User['id']>();

export default (io: SocketIO.Server): void => {
  io.on('connection', (socket: Socket) => {

    socket.on('room', ({ id, role }: User) => {
      if (role === 'CLIENT') {
        socket.join(rooms.CLIENT_ROOM);
        clients.add(id);
      }
      if (role === 'DRIVER') {
        socket.join(rooms.DRIVER_ROOM);
        drivers.add(id);
      }
    });

    socket.on('leave', ({ id, role }: User) => {
      if (role === 'CLIENT') {
        socket.leave(rooms.CLIENT_ROOM);
        clients.delete(id);
      }
      if (role === 'DRIVER') {
        socket.leave(rooms.DRIVER_ROOM);
        drivers.delete(id);
      }
    });

    createOrderConsumer.on('message', (newOrder: any) => {
      socket.in(rooms.DRIVER_ROOM).emit(events.CREATE_ORDER, newOrder);
    });

    submitOrderConsumer.on('message', (submittedOrder: any) => {
      socket.emit(events.SUBMIR_ORDER, submittedOrder);
    });

    cancelOrderConsumer.on('message', (canceledOrder: any) => {
      socket.emit(events.CANCEL_ORDER, cancelOrderConsumer);
    });
  });
};
