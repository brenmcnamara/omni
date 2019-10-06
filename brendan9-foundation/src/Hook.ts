import { Subscription } from './Subscription';

export interface HookOptions<TParam, TReturn> {
  onError: (error: Error) => Promise<void>;
  onCompletion: () => Promise<void>;
  onNext: (params: TParam) => Promise<TReturn>;
}

export interface Hook<TParam, TReturn> {
  register: (options: HookOptions<TParam, TReturn>) => Subscription;
}
