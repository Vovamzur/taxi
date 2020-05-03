import http, { Server } from 'http';
import dotenv from 'dotenv';
import app from './app';
import prisma from './db';

dotenv.config();

const port: number = process.env.AUTH_PORT || 3000;
const httpServer: Server = http.createServer(app);

start();

process.on('SIGINT', gracefullShutdown);
process.on('uncaughtException', logError);
process.on('warning', logError);
process.on('unhandledRejection', logError);

async function start() {
  try {
    await prisma.connect();
    httpServer.listen(port, () => {
      console.log(`Auth service start on port ${port}`);
    });
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}

async function gracefullShutdown() {
  try {
    await prisma.disconnect();
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
  console.error(`Auth service Error: ${err}`);
  console.error(err.stack);
}
