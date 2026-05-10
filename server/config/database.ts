import { Result } from 'better-result';
import { z } from 'zod';

const dbConfigSchema = z.object({
  host: z.string({ error: 'Invalid db host' }),
  port: z.coerce.number({ error: 'Invalid db port' }),
  database: z.string({ error: 'Invalid db database' }),
  ssl: z.stringbool({ error: 'Invalid db ssl' }),
  user: z.string({ error: 'Invalid db user' }),
  password: z.string({ error: 'Invalid db password' }),
});

export function getDbConfig() {
  const parsedDbConfig = dbConfigSchema.safeParse({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: process.env.DB_SSL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  return parsedDbConfig.success
    ? Result.ok(parsedDbConfig.data)
    : Result.err(z.treeifyError(parsedDbConfig.error));
}
