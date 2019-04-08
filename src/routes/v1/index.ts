import koarouter from 'koa-router';

const router = new koarouter({ prefix: '/v1' });

router.get('/', async (ctx) => {
  throw new Error('fuck it on purpose');
  ctx.status = 200;
  ctx.type = 'application/json';
  ctx.body = { msg: 'boilerplate - simple node web service' };
});

export default router;
