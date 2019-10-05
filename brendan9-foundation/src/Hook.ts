export interface Hook<TParam, TReturn> {
  new (options: {
    onNext: (value: TParam) => Promise<TReturn>;
    onCompletion: () => Promise<void>;
    onError: (error: Error) => Promise<void>;
  }): Hook<TParam, TReturn>;
}

export interface PausableHook<TParam, TReturn> extends Hook<TParam, TReturn> {
  pause: () => void;

  run: () => void;
}
