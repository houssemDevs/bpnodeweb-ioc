import koarouter from 'koa-router';

import v1 from './v1';

const router = new koarouter();

router.use(v1.routes());
router.use(v1.allowedMethods());

export default router;
