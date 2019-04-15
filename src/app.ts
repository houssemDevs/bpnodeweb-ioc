import koa from 'koa';

import { IContextState } from '@/types';

const app = new koa<IContextState>();

export default app;
