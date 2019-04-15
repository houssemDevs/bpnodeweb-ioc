import { ParameterizedContext } from 'koa';
import uuid from 'uuid/v4';

import { IContextState } from '../types';

export default async (ctx: ParameterizedContext<IContextState>, next: any) => {
  ctx.state.id = uuid();
  await next();
};
