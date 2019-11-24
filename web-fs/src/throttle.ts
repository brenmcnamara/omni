export type Procedure = (...args: any[]) => void;

export default function throttle<F extends Procedure>(
  waitMilliseconds: number,
  func: F,
): F {
  let timeoutID: ReturnType<typeof setInterval> | undefined;
  let pendingArgs: any[] | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    function doLater() {
      if (!pendingArgs) {
        clearInterval(timeoutID);
        timeoutID = undefined;
        return;
      }

      func.apply(context, pendingArgs);
      pendingArgs = undefined;
    }

    if (timeoutID !== undefined) {
      pendingArgs = args;
      return;
    }

    func.apply(context, args);
    timeoutID = setInterval(doLater, waitMilliseconds);
  } as any;
}
