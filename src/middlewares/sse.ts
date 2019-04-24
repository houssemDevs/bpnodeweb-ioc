import { CustomKoaContext } from '@/types';
import StreamServerSentEvent, { IStreamServerSentEventOptions } from '@/utils/stream_sse';
import { Writable } from 'stream';

export default (timeout = -1, opts?: IStreamServerSentEventOptions) => async (ctx: CustomKoaContext, next: any) => {
  const sseStream = new StreamServerSentEvent(ctx, opts);
  ctx.state.sse = sseStream;
  await next();
  if (!ctx.body) {
    ctx.body = sseStream;
  } else if (ctx.body instanceof Writable) {
    sseStream.pipe(ctx.body);
  } else {
    sseStream.send(ctx.body);
    ctx.body = sseStream;
  }
  if (timeout !== -1) {
    setTimeout(() => {
      sseStream.terminate();
    }, timeout);
  }
};
