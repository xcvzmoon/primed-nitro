import { drizzle } from 'drizzle-orm/node-postgres';
import { EnhancedQueryLogger } from 'drizzle-query-logger';
import { Pool } from 'pg';
import { dbConfig } from '~/server/config/database';

export const db = drizzle({
  client: new Pool(dbConfig),
  logger: new EnhancedQueryLogger(),
});
