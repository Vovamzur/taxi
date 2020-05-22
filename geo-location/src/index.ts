import http, { Server } from 'http';

import express, { Application } from 'express';
import socketIO from 'socket.io';

import dbConnection from './dbConnection';
import { UpdateCoordinates } from './coordinates.type';

const app: Application = express();
const port: number = process.env.GEO_LOCATION_PORT;
const httpServer: Server = http.createServer(app);
const io: SocketIO.Server = socketIO(httpServer);
const coordinatesTable = dbConnection('coordinates')

start();

process.on('SIGINT', gracefullShutdown);
process.on('uncaughtException', logError);
process.on('warning', logError);
process.on('unhandledRejection', logError);

async function start () {
  try {
    await dbConnection.raw('select 1+1 as result');
    console.log('Connection to auth DB has been established successfully.');

    io.on('connection', (socket: SocketIO.Socket) => {
      socket.on('updateUserPosition', async ({ userId, position }: UpdateCoordinates) => {
        const { longitude, latitude } = position
        const userCoordinatesId = await coordinatesTable
          .where('userId', '=', userId)
          .select('id');
        if (userCoordinatesId) {
          await coordinatesTable.where('id', '=', userCoordinatesId).update({
            longitude,
            latitude
          })
        }
        await coordinatesTable.insert({ userId, longitude, latitude })
      })
    });
    
    httpServer.listen(port, () => {
      console.log(`Geolocation service start on port ${port}`);
    });
  } catch (err) {
    logError(err)
  }
}

async function gracefullShutdown () {

}

function logError (err: Error) {
  console.error(`Geo location service error: ${err}`);
}
