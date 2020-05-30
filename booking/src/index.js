import dotenv from 'dotenv';

import sequelize from './data/db/connection';
import app from './app'

dotenv.config();

const port = process.env.BOOKING_SERVICE_PORT;
const httpServer = http.createServer(app);

start();

process.on('SIGINT', gracefullShutdown);
process.on('uncaughtException', logError);
process.on('warning', logError);
process.on('unhandledRejection', logError);

async function start () {
  try {
    await sequelize.authenticate();
    console.log('Connection to bookign DB has been established successfully.');

    httpServer.listen(port, () => {
      console.log(`Booking service starts on port ${port}`);
    })
  } catch (err) {
    logError(err);
  }
}

async function gracefullShutdown() {
  try {
    await sequelize.close();
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

function logError (error) {
  console.error(`Booking service error: ${error}`);
  console.error(error.stack);
}
