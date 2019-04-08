import cp from 'child_process';
import { ReadableOptions } from 'stream';
import { Readable } from 'stronger-typed-streams';

export default class StreamOutChildProcess<TPayload> extends Readable<
  TPayload
> {
  private filepath: string;
  constructor(
    scriptFilepath: string,
    timeout: number = 60 * 1000,
    opts?: ReadableOptions,
  ) {
    super({ objectMode: true, ...opts });
    this.filepath = scriptFilepath;
    const child = cp.fork(this.filepath);
    child.on('message', (msg) => this.push(msg));
    if (timeout !== -1) {
      setTimeout(() => {
        this.push(null);
      }, timeout);
    }
  }
  // tslint:disable-next-line: no-empty
  public _read(size: number) {}
}
