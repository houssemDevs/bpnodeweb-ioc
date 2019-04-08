import koacompose from 'koa-compose';

import error from './error';
import favicon from './favicon';
import id from './id';
import logger from './logger';

const middlewares = koacompose([favicon, id, logger, error(true)]);

export default middlewares;
