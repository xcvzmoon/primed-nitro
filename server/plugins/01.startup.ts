import { consola } from 'consola';
import { definePlugin } from 'nitro';
import { dbConfig } from '~/server/config/database';

export default definePlugin(() => {
  consola.info(dbConfig && 'Successfully initialized database config');
});
