import uuid from 'uuid/v4';

import { CustomKoaContext } from '../types';

export default async (ctx: CustomKoaContext, next: any) => {
  ctx.state.id = uuid();
  await next();
};
