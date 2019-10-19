export default class DeconstructedPromise<T> implements PromiseLike<T> {
  private _resolve: ((val: T) => void) | null = null;
  private _reject: ((error: Error) => void) | null = null;

  private isCompleted: boolean = false;
  private promiseRaw: Promise<T>;
  private resolveEagerValue: T | null = null;
  private rejectEagerValue: Error | null = null;

  constructor() {
    this.promiseRaw = new Promise<T>((resolve, reject) => {
      if (this.resolveEagerValue) {
        resolve(this.resolveEagerValue);
      } else if (this.rejectEagerValue) {
        reject(this.rejectEagerValue);
      } else {
        this._resolve = resolve;
        this._reject = reject;
      }
    });
  }

  public resolve(val: T) {
    if (this.isCompleted) {
      throw Error('Cannot resolve a promise that is completed');
    }

    this.isCompleted = true;

    if (!this._resolve) {
      this.resolveEagerValue = val;
      return;
    }

    this._resolve(val);
  }

  public reject(error: Error) {
    if (this.isCompleted) {
      throw Error('Cannot reject a promise that is completed');
    }

    this.isCompleted = true;

    if (!this._reject) {
      this.rejectEagerValue = error;
      return;
    }

    this._reject(error);
  }

  public then<S>(cb: (val: T) => S | PromiseLike<S>): Promise<S> {
    return this.promiseRaw.then(cb);
  }

  public catch<S = never>(
    cb?: ((error: Error) => S | PromiseLike<S>) | undefined | null,
  ): Promise<T | S> {
    return this.promiseRaw.catch(cb);
  }
}
