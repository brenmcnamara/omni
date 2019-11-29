import { Middleware } from './Store';

export function createMiddleware(): Middleware {
  return store => next => action => {
    next(action);
  };
}
