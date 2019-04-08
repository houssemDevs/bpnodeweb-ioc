import koa from 'koa';

import { IContextState } from './types/ctxstate';

const app = new koa<IContextState>();

export default app;
