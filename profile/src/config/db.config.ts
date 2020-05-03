import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import entities from '../db/entities';
import migrations from '../db/seed';

dotenv.config();

const url = process.env.PROFILE_DB_URL;

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  url,
  synchronize: true,
  logging: true,
  entities,
  migrations
};

export default dbConfig;
