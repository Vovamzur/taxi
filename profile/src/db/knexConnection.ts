import * as Knex from 'knex';

import * as dbConfig from '../config/knex.config';

const dbInstance: Knex = Knex.default(dbConfig as Knex.Config);

export default dbInstance;
