import koa from 'koa';

import router from './routes';
import { IContextState } from './types/ctxstate';

const app = new koa<IContextState>();

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
