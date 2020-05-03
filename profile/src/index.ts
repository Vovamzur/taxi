import http, { Server } from 'http';
import dotenv from 'dotenv';
import { createConnection, Connection } from 'typeorm';

import dbConfig from './config/db.config';
import app from './app';

dotenv.config();

const port: number = process.env.PROFILE_PORT || 3000;
const httpServer: Server = http.createServer(app);
let connection: Connection;

start();

process.on('SIGINT', gracefullShutdown);
process.on('uncaughtException', logError);
process.on('warning', logError);
process.on('unhandledRejection', logError);

async function start() {
  try {
    connection = await createConnection(dbConfig);
    await connection.runMigrations();
    httpServer.listen(port, () => {
      console.log(`Profile service start on port ${port}`);
    });
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}

async function gracefullShutdown() {
  try {
    await connection.close();
    httpServer.close((error) => {
      if (error) {
        logError(error);
        process.exit(1);
      }
    });
    process.exit(0);
  } catch (error) {
    logError(error);
  }
}

function logError(err: any) {
  console.error(`Profile service error: ${err}`);
  console.error(err.stack);
}
