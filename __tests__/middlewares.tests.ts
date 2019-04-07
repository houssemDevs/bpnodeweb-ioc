import { ParameterizedContext } from 'koa';
import idMiddleware from '../src/middlewares/id';

describe('Middlewares', () => {
  describe('id', () => {
    let ctx: any = {};
    beforeEach(() => {
      ctx = { state: {} };
    });
    it('should set a v4 uuid on ctx.state as "id"', async () => {
      await idMiddleware(ctx, () => ({}));
      expect(ctx.state.id).toBeDefined();
    });
    it('should not return same id twice', async () => {
      await idMiddleware(ctx, () => ({}));
      const firstid = ctx.state.id;
      await idMiddleware(ctx, () => ({}));
      expect(ctx.state.id).not.toEqual(firstid);
    });
  });
});
