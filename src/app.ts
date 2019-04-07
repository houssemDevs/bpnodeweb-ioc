import koa from 'koa';
import koarouter from 'koa-router';

const app = new koa();

const router = new koarouter();

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
