import uuid from 'uuid/v4';
import { ParameterizedContext } from 'koa';

import { IContextState } from '../types/ctxstate';

export default async (ctx: ParameterizedContext<IContextState>, next: any) => {
  ctx.state.id = uuid();
  await next();
};
