import { consola } from 'consola';
import { definePlugin } from 'nitro';
import { useStorage } from 'nitro/storage';
import useFsDriver from 'unstorage/drivers/fs-lite';
import useRedisDriver from 'unstorage/drivers/redis';
import { getDbConfig } from '~/server/config/database';
import { getRedisConfig } from '~/server/config/redis';

export default definePlugin(() => {
  if (process.env.ENABLE_DATABASE === 'TRUE') {
    const dbConfigResult = getDbConfig();

    if (dbConfigResult.isErr()) {
      consola.error(dbConfigResult.error);
      return;
    }

    consola.info(dbConfigResult.value && 'Successfully initialized database config');
  }

  const storage = useStorage();

  if (process.env.CACHE_STORAGE === 'REDIS') {
    const redisConfigResult = getRedisConfig();

    if (redisConfigResult.isErr()) {
      consola.error(redisConfigResult.error);
      return;
    }

    const redisDriver = useRedisDriver({
      base: 'redis',
      url: redisConfigResult.value,
    });

    storage.mount('cache', redisDriver);
    consola.success('Successfully mounted cache driver');

    consola.info(`Using redis for caching`);
    consola.info(redisConfigResult.value && 'Successfully initialized redis config');
  } else {
    const fsDriver = useFsDriver({ base: './.cache' });

    storage.mount('cache', fsDriver);
    consola.success('Successfully mounted cache driver');

    consola.info(`Using fs for caching`);
  }
});
