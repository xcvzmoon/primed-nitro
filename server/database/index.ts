import { drizzle } from 'drizzle-orm/node-postgres';
import { EnhancedQueryLogger } from 'drizzle-query-logger';
import { Pool } from 'pg';
import { getDbConfig } from '~/server/config/database';

const dbConfigResult = getDbConfig();

if (dbConfigResult.isErr()) {
  throw new Error(JSON.stringify(dbConfigResult.error, null, 2));
}

export const db = drizzle({
  client: new Pool(dbConfigResult.value),
  logger: new EnhancedQueryLogger(),
});
