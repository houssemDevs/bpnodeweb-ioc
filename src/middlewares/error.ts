import { ParameterizedContext } from 'koa';

export default (log: boolean = true) => async (
  ctx: ParameterizedContext,
  next: any,
) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = { msg: 'Something had gone wrong, we are working on it' };
    if (log) { console.log(err); }
  }
};
