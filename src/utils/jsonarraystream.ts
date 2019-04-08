import { TransformOptions } from 'stream';
import { Transform } from 'stronger-typed-streams';
import { isObject } from 'util';

export default class JSONArrayStream extends Transform<{}, string> {
  private firstObject: boolean;
  constructor(opts?: TransformOptions) {
    super({ objectMode: true, ...opts });
    this.firstObject = true;
  }
  public _transform(data: any, encoding: string, done: () => void): void {
    if (isObject(data)) {
      data = JSON.stringify(data);
    }
    if (this.firstObject) {
      this.push(`[${data}`);
      this.firstObject = false;
    } else {
      this.push(`,${data}`);
    }
    done();
  }
  public _flush(done: () => void): void {
    if (this.firstObject) {
      this.push('[');
    }
    this.push(']');
    done();
  }
}
