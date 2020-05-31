import http, { Server } from 'http';

import express, { Application } from 'express';
import socketIO from 'socket.io';

import knexConnection from './dbConnection';
import { UpdateCoordinates, Coordinate } from './coordinates.type';
import { getInRadius } from './helpers/distance';

const app: Application = express();
const port: number = process.env.GEO_LOCATION_PORT;
const httpServer: Server = http.createServer(app);
const io: SocketIO.Server = socketIO(httpServer);

start();

process.on('SIGINT', gracefullShutdown);
process.on('uncaughtException', logError);
process.on('warning', logError);
process.on('unhandledRejection', logError);

async function start() {
  try {
    await knexConnection.raw('select 1+1 as result');
    console.log('Connection to auth DB has been established successfully.');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/nearestDrivers/:userId', async (req, res) => {
      const allActiveDrivers = await knexConnection<Coordinate>('coordinates')
        .where('isActive', '=', true)
        .where('isDriver', '=', true)
        .select();
      const nearestDrivers = getInRadius(allActiveDrivers, req.body);
      
      res.json(nearestDrivers)
    });

    io.on('connection', (socket: SocketIO.Socket) => {
      socket.on('updatePosition', async ({ userId, position }: UpdateCoordinates) => {
        const { longitude, latitude } = position
        const row: Coordinate = {
          longitude,
          latitude,
          userId,
          isActive: true,
          isDriver: true,
          socketId: socket.id
        }
        const userCoordinates = await knexConnection<Coordinate>('coordinates')
          .where('userId', '=', userId)
          .first();
        userCoordinates
          ? await knexConnection<Coordinate>('coordinates')
            .where('id', '=', userCoordinates.id)
            .update(row)
          : await knexConnection<Coordinate>('coordinates').insert(row)
      });

      socket.on('leave', async (userId: string) => {
        const userCoordinates = await knexConnection<Coordinate>('coordinates')
          .where('userId', '=', userId)
          .first();

        if (!userCoordinates) return

        await knexConnection<Coordinate>('coordinates')
          .where('id', '=', userCoordinates.id)
          .update({ ...userCoordinates, isActive: false });
      });

      socket.on('nearestDrivers', async ({ userId, userCoordinate }: { userId: string, userCoordinate: Coordinate}) => {
        const allActiveDrivers = await knexConnection<Coordinate>('coordinates')
          .where('userId', '<>', userId)
          .where('isDriver', '=', true)
          .where('isActive', '=', true)
          .select();
        
        const nearestDrivers = getInRadius(allActiveDrivers, userCoordinate);

        socket.emit('activeDrivers', nearestDrivers)
      });
    });

    httpServer.listen(port, () => {
      console.log(`Geolocation service start on port ${port}`);
    });
  } catch (err) {
    logError(err)
  }
}

async function gracefullShutdown() {

}

function logError(err: Error) {
  console.error(`Geo location service error: ${err}`);
}
