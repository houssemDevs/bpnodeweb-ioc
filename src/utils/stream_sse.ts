import { ParameterizedContext } from 'koa';
import { TransformCallback, TransformOptions } from 'stream';
import { Transform } from 'stronger-typed-streams';
import { isObject } from 'util';

export interface IEvent {
  type?: string;
  id?: string;
  relay?: number;
  payload?: any;
}

export interface IStreamServerSentEventOptions {
  endEvent: string;
  log: boolean;
}

export default class StreamServerSentEvent extends Transform<IEvent, string> {
  private readonly ctx: ParameterizedContext;
  private ended: boolean;
  private readonly endEvent: string;
  private readonly log: boolean;
  constructor(ctx: ParameterizedContext, options: IStreamServerSentEventOptions = { endEvent: 'EndSSE', log: true }, opts?: TransformOptions) {
    super({ objectMode: true, ...opts });
    this.ctx = ctx;
    this.ended = false;
    this.endEvent = options.endEvent;
    this.log = options.log;

    this._setHeaders();
  }
  public send(data: IEvent, encoding?: string, done?: TransformCallback) {
    if (arguments.length === 0 || this.ended) {
      return false;
    }
    return super.write(data, encoding, done);
  }
  public terminate(data?: IEvent, encoding?: string, done?: () => void) {
    if (this.ended) {
      this._log('Stream already ended');
      return;
    }
    this._log(`Ending the stream`);
    if (!data) {
      data = { type: this.endEvent };
    } else {
      data = { type: this.endEvent, payload: data.payload };
    }
    super.end(data, encoding, done);
    this.ended = true;
  }
  public _transform(data: IEvent, encoding: string, done: TransformCallback) {
    let event: IEvent;
    const serialization: string[] = [];
    if (!isObject(data)) {
      event = { payload: data };
    } else {
      event = data;
    }

    // metadata.
    if (event.id) {
      serialization.push(`id: ${event.id}`);
    }
    if (event.relay) {
      serialization.push(`relay: ${event.relay}`);
    }
    if (event.type) {
      serialization.push(`event: ${event.type}`);
    }

    // data or payload.
    if (isObject(event.payload)) {
      serialization.push(`data: ${JSON.stringify(event.payload)}`);
    } else if (event.payload) {
      serialization.push(`data: ${event.payload}`);
    }

    this._log(serialization.join('-').concat('--'));

    this.push(serialization.join('\n').concat('\n\n'));
    done();
  }
  private _setHeaders() {
    this.ctx.req.socket.setKeepAlive(true);
    this.ctx.req.socket.setNoDelay(true);
    this.ctx.req.socket.setTimeout(0);
    this.ctx.set('Content-Type', 'text/event-stream');
    this.ctx.set('Connection', 'keep-alive');
    this.ctx.set('Cache-Control', 'no-cache');
    this.ctx.status = 200;
  }
  private _log(msg: string) {
    if (this.log) {
      console.log(`stream_sse: ${msg}`);
    }
  }
}
