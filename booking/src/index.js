import { GraphQLServer } from 'graphql-yoga';
import dotenv from 'dotenv';

import resolvers from './resolvers';
import sequelize from './data/db/connection';

dotenv.config();

const port = process.env.BOOKING_SERVICE_PORT;
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: ({ request, response }) => ({
    req: request,
    res: response
  })
});

start();

process.on('SIGINT', gracefullShutdown);
process.on('uncaughtException', logError);
process.on('warning', logError);
process.on('unhandledRejection', logError);

async function start () {
  try {
    await sequelize.authenticate();
    console.log('Connection to bookign DB has been established successfully.');

    const app = await server.start({ port });
    console.log(`Booking service starts on port ${port}`);

    return app;
  } catch (err) {
    logError(err);
  }
}

async function gracefullShutdown() {
  try {
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    logError(error);
  }
}

function logError (error) {
  console.error(`Booking service error: ${error}`);
  console.error(error.stack);
}
