import { consola } from 'consola';
import { definePlugin } from 'nitro';
import { useStorage } from 'nitro/storage';
import useFsDriver from 'unstorage/drivers/fs-lite';
import useRedisDriver from 'unstorage/drivers/redis';
import { dbConfig } from '~/server/config/database';
import { getRedisConfig } from '~/server/config/redis';

export default definePlugin(() => {
  consola.info(dbConfig && 'Successfully initialized database config');

  const storage = useStorage();

  if (process.env.CACHE_STORAGE?.toUpperCase() === 'REDIS') {
    const redisConfig = getRedisConfig();

    if (redisConfig.isErr()) {
      consola.error(redisConfig.error);
      return;
    }

    const redisDriver = useRedisDriver({
      base: 'redis',
      url: redisConfig.value,
    });

    storage.mount('cache', redisDriver);
    consola.success('Successfully mounted cache driver');

    consola.info(`Using redis for caching`);
    consola.info(redisConfig.value && 'Successfully initialized redis config');
  } else {
    const fsDriver = useFsDriver({ base: './.cache' });

    storage.mount('cache', fsDriver);
    consola.success('Successfully mounted cache driver');

    consola.info(`Using fs for caching`);
  }
});
