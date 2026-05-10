import { defineConfig } from 'drizzle-kit';
import { dbConfig } from '~/server/config/database';

export default defineConfig({
  dbCredentials: dbConfig,
  dialect: 'postgresql',
  schema: 'server/database/schemas/*.ts',
  out: 'server/database/migrations/',
  schemaFilter: [],
  tablesFilter: [],
  verbose: true,
  casing: 'snake_case',
});
