import { ParameterizedContext } from 'koa';
import request from 'supertest';

import app from '@/app';
import { IContextState } from '@/types/ctxstate';
import error from '../src/middlewares/error';
import id from '../src/middlewares/id';
import sse from '../src/middlewares/sse';
import StreamServerSentEvent from '../src/utils/stream_sse';

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
      app.use(async (ctx: ParameterizedContext<IContextState>, next: any) => {
        await next();
        expect(ctx.state.sse).toBeDefined();
        expect(ctx.body).toBeInstanceOf(StreamServerSentEvent);
        (ctx.state.sse as StreamServerSentEvent).send({ payload: 'houssem' });
        (ctx.state.sse as StreamServerSentEvent).terminate();
      });

      const endingEvent = 'endsse';

      app.use(sse(-1, { endEvent: endingEvent, log: false }));

      const resp = await request(app.callback()).get('/');

      expect(resp.get('Content-Type')).toMatch('text/event-stream');
      expect(resp.get('Connection')).toMatch('keep-alive');
      expect(resp.get('Cache-Control')).toMatch('no-cache');
      expect(resp.status).toEqual(200);
      expect(resp.text).toMatch(`event: ${endingEvent}`);
      expect(resp.text).toMatch(`data: houssem`);
    });
  });
});
