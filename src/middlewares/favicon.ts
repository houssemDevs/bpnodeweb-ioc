import { ParameterizedContext } from 'koa';

export default async (ctx: ParameterizedContext, next: any) => {
  if (/favicon\.ico/.test(ctx.path)) {
    console.log('favicon request');
    ctx.status = 200;
    ctx.body = {};
  } else {
    await next();
  }
};
