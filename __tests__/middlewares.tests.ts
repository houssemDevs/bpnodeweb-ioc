import { ParameterizedContext } from 'koa';
import supertest from 'supertest';

import appBase from '@/app';
import error from '@/middlewares/error';
import id from '@/middlewares/id';
import sse from '@/middlewares/sse';
import { IContextState } from '@/types';
import StreamServerSentEvent from '@/utils/stream_sse';

describe('Middlewares', () => {
  describe('id', () => {
    let ctx: any = {};
    beforeEach(() => {
      ctx = { state: {} };
    });
    it('should set a v4 uuid on ctx.state as "id"', async () => {
      await id(ctx, () => ({}));
      expect(ctx.state.id).toBeDefined();
    });
    it('should not return same id twice', async () => {
      await id(ctx, () => ({}));
      const firstid = ctx.state.id;
      await id(ctx, () => ({}));
      expect(ctx.state.id).not.toEqual(firstid);
    });
  });
  describe('error', () => {
    it('should catch error and respond correctly', async () => {
      const ctx: any = {};
      await error(false)(ctx, () => {
        throw new Error('err');
      });
      expect(ctx.status).toBe(500);
      expect(ctx.body.msg).toBeDefined();
    });
  });
  describe('sse', () => {
    it('should set an sse stream correctly', async () => {
      appBase.use(async (ctx: ParameterizedContext<IContextState>, next: any) => {
        await next();
        expect(ctx.state.sse).toBeDefined();
        expect(ctx.body).toBeInstanceOf(StreamServerSentEvent);
        (ctx.state.sse as StreamServerSentEvent).send({ payload: 'houssem' });
        (ctx.state.sse as StreamServerSentEvent).terminate();
      });

      const endingEvent = 'endsse';

      appBase.use(sse(-1, { endEvent: endingEvent, log: false }));

      const resp = await supertest(appBase.callback()).get('/');

      expect(resp.get('Content-Type')).toMatch('text/event-stream');
      expect(resp.get('Connection')).toMatch('keep-alive');
      expect(resp.get('Cache-Control')).toMatch('no-cache');
      expect(resp.status).toEqual(200);
      expect(resp.text).toMatch(`event: ${endingEvent}`);
      expect(resp.text).toMatch(`data: houssem`);
    });
  });
});
