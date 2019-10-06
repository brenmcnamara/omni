import { Subscription } from './Subscription';

export interface HookOptions<TParam, TReturn> {
  onError: (error: Error) => Promise<TReturn>;
  onCompletion: () => Promise<void>;
  onNext: (params: TParam) => Promise<void>;
}

export interface Hook<TParam, TReturn> {
  register: (options: HookOptions<TParam, TReturn>) => Subscription;
}
