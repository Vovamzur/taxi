import http, { Server } from 'http';

import express, { Application } from 'express';
import socketIO from 'socket.io';

import socketHandlers from './socket/handlers';

const app: Application = express();
const port: number = process.env.WEB_SOCKET_PORT || 3010;
const httpServer: Server = http.createServer(app);
const io: SocketIO.Server = socketIO(httpServer);

socketHandlers(io);

httpServer.listen(port, () => {
  console.log(`Web sokcket service start on port ${port}`);
});
