import koacompose from 'koa-compose';

import error from './error';
import id from './id';
import logger from './logger';

const middlewares = koacompose([id, logger, error]);

export default middlewares;
