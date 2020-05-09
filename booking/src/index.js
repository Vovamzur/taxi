import dotenv from 'dotenv';

import sequelize from './data/db/connection';
import server from './server'

dotenv.config();

const port = process.env.BOOKING_SERVICE_PORT;
let app;

start();

process.on('SIGINT', gracefullShutdown);
process.on('uncaughtException', logError);
process.on('warning', logError);
process.on('unhandledRejection', logError);

async function start () {
  try {
    await sequelize.authenticate();
    console.log('Connection to bookign DB has been established successfully.');

    app = await server.start({ port });
    console.log(`Booking service starts on port ${port}`);
  } catch (err) {
    logError(err);
  }
}

async function gracefullShutdown() {
  try {
    await sequelize.close();
    await app.close()
    process.exit(0);
  } catch (error) {
    logError(error);
  }
}

function logError (error) {
  console.error(`Booking service error: ${error}`);
  console.error(error.stack);
}
