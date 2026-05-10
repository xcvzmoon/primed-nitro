import { Result } from 'better-result';
import { z } from 'zod';

const redisConfigSchema = z.string().startsWith('redis://', { error: 'Invalid redis url value' });

export function getRedisConfig() {
  const parsedRedisConfig = redisConfigSchema.safeParse(process.env.REDIS_URL);

  return parsedRedisConfig.success
    ? Result.ok(parsedRedisConfig.data)
    : Result.err(z.treeifyError(parsedRedisConfig.error));
}
