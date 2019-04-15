import 'reflect-metadata';

import { KoaInversifyServer } from 'koa-ioc-utils';

import appBase from './app';
import container from './container';
import middlewares from './middlewares';

import '@/controllers';

const port = process.env.PORT || 4000;

appBase.use(middlewares);

const app = new KoaInversifyServer(container, appBase).build();

app.listen(port, () => {
  console.log(`service on ${port} ...`);
});
