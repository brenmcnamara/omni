import { useEffect, useState } from 'react';

export type Procedure = (...args: any[]) => void;

class ThrottleImpl<F extends Procedure> {
  private _func: F;
  private calledArgs: any[] | undefined;
  private calledContext: any | undefined;
  private timeoutID: ReturnType<typeof setInterval> | undefined;
  private waitMilliseconds: number;

  constructor(waitMilliseconds: number, func: F) {
    this._func = func;
    this.waitMilliseconds = waitMilliseconds;
  }

  set func(newValue: F) {
    this._func = newValue;
  }

  public run(context: any, ...args: any[]) {
    if (this.timeoutID !== undefined) {
      this.calledContext = context;
      this.calledArgs = args;
      return;
    }

    // No running interval, we should call the function immediately and
    // start an interval.
    this._func.apply(context, args);
    this.timeoutID = setInterval(() => this.execute(), this.waitMilliseconds);
  }

  public cancel() {}

  private execute() {
    if (this.calledArgs === undefined) {
      // There was no pending execution. We should clear the interval.
      clearInterval(this.timeoutID);
      this.timeoutID = undefined;
      return;
    }

    this._func.apply(this.calledContext, this.calledArgs);
    this.calledContext = undefined;
    this.calledArgs = undefined;
  }
}
export default function throttle<F extends Procedure>(
  waitMilliseconds: number,
  func: F,
): F {
  const impl = new ThrottleImpl(waitMilliseconds, func);

  return function(this: any, ...args: any[]) {
    impl.run(this, ...args);
  } as any;
}

export function useThrottle<F extends Procedure>(
  waitMilliseconds: number,
  func: F,
): F {
  const impl = useState(new ThrottleImpl(waitMilliseconds, func))[0];

  useEffect(() => {
    return function cleanup() {
      impl.cancel();
    };
  }, [impl]);

  // Need to update the throttled function on every call.
  impl.func = func;

  return function throttle(this: any, ...args: any[]) {
    impl.run(this, ...args);
  } as any;
}
