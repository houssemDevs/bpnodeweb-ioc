import compose from 'koa-compose';

import favicon from './favicon';
import id from './id';

const middlewares = compose([favicon, id]);

export default middlewares;
