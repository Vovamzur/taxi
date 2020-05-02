import http, { Server } from 'http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port: number = process.env.AUTH_PORT || 3000;

const httpServer: Server = http.createServer(app);
httpServer.listen(port, () => {
  console.log(`Auth service start on port ${port}`);
});

const gracefullShutdown = () => {
  httpServer.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  });
  process.exit(0);
};

const logError = (err: any) => {
  console.error(`Auth service Error: ${err}`);
  console.error(err.stack);
};

process.on('SIGINT', gracefullShutdown);
process.on('uncaughtException', logError);
process.on('warning', logError);
process.on('unhandledRejection', logError);
