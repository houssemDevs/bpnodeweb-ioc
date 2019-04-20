import koa from 'koa';

import middlewares from '@/middlewares';
import { CustomKoaContext } from '@/types';

const app = new koa<CustomKoaContext>();

app.use(middlewares);

export default app;
