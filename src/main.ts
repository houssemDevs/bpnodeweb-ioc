import 'reflect-metadata';

import { KoaInversifyServer } from 'koa-ioc-utils';

import appBase from './app';
import container from './container';

import '@/controllers';
import { CustomKoaContext } from './types';

const port = process.env.PORT || 4000;

const app = new KoaInversifyServer<CustomKoaContext>(
  container,
  appBase,
).build();

app.listen(port, () => {
  console.log(`service on ${port} ...`);
});
