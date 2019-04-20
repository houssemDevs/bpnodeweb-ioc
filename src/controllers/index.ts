import { inject } from 'inversify';
import { controller, httpGet } from 'koa-ioc-utils';

import { IOC_TYPES } from '@/constants';
import { HelloWorldService } from '@/services/service';
import { CustomKoaContext } from '@/types';

@controller('/home')
export default class HomeController {
  private _helloWorld: HelloWorldService;
  constructor(@inject(IOC_TYPES.helloWorld) helloService: HelloWorldService) {
    this._helloWorld = helloService;
  }
  @httpGet('/')
  public home(ctx: CustomKoaContext) {
    ctx.status = 200;
    ctx.body = this._helloWorld.greet();
  }
}
