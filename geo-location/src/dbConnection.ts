import * as Knex from 'knex';

import * as dbConfig from './db.config';

const dbInstance: Knex = Knex.default(dbConfig as Knex.Config);

export default dbInstance;
