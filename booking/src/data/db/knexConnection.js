import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  client: process.env.DB_DIALECT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 8 }
};

const dbInstance = knex(dbConfig);

export default dbInstance;
