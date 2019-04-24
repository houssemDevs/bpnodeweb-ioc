import Application from 'koa';

import middlewares from '@/middlewares';
import { CustomKoaContext } from '@/types';

const appBase = new Application<CustomKoaContext>();

appBase.use(middlewares);

export default appBase;
