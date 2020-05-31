import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import routes from './api/routes';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  next();
})

routes(app);
app.use(errorHandlerMiddleware);

export default httpServer;
