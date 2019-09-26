import { Subscription } from '@nine-point/core-foundation';

export class Hook<TResult> {
  public subscribe(cb: (result: TResult) => Promise<void>): Subscription {
    return { remove: () => {} };
  }
}
