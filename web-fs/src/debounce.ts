export type Procedure = (...args: any[]) => void;

export default function debounce<F extends Procedure>(
  waitMilliseconds: number,
  func: F,
): F {
  let timeoutID: ReturnType<typeof setTimeout> | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    function doLater() {
      func.apply(context, args);
      timeoutID = undefined;
    }

    if (timeoutID !== undefined) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(doLater, waitMilliseconds);
  } as any;
}
