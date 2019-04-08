import { ParameterizedContext } from 'koa';

import { IContextState } from '@/types/ctxstate';

export default async (ctx: ParameterizedContext<IContextState>, next: any) => {
  const start = Date.now();
  console.log(`--> ${ctx.method} ${ctx.path} ${ctx.ip} ${ctx.state.id}`);
  await next();
  console.log(
    `<-- ${ctx.method} ${ctx.path} ${ctx.ip} ${ctx.state.id} ${
      ctx.status
    } ${Date.now() - start}ms`,
  );
};
