import { ParameterizedContext } from 'koa';
import { controller, httpGet } from 'koa-ioc-utils';

import { IContextState } from '@/types';

@controller('/home')
export default class HomeController {
  @httpGet('/')
  public home(ctx: ParameterizedContext<IContextState>) {
    ctx.status = 200;
    ctx.body = 'home';
  }
}
