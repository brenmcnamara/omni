import StoreStateCache from './StoreStateCache';
import throttle from '../../throttle';

import { Middleware } from '../Store';

export function createMiddleware(): Middleware {
  return store => {
    const cacheState = throttle(1000, () => {
      StoreStateCache.set(store.getState());
    });

    return next => action => {
      next(action);
      cacheState();
    };
  };
}
