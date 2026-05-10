import { defineConfig } from 'drizzle-kit';
import { getDbConfig } from './server/config/database';

const dbConfigResult = getDbConfig();

if (dbConfigResult.isErr()) {
  throw new Error(JSON.stringify(dbConfigResult.error, null, 2));
}

export default defineConfig({
  dbCredentials: dbConfigResult.value,
  dialect: 'postgresql',
  schema: 'server/database/schemas/*.ts',
  out: 'server/database/migrations/',
  schemaFilter: [],
  tablesFilter: [],
  verbose: true,
  casing: 'snake_case',
});
