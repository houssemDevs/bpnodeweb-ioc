import { injectable } from 'inversify';

@injectable()
export class HelloWorldService {
  public greet(): string {
    return 'Hello, world';
  }
}
