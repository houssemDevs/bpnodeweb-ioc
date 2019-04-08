import koacompose from 'koa-compose';

import idMiddleware from './id';

const middlewares = koacompose([idMiddleware]);

export default middlewares;
