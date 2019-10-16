import { Hook } from '@brendan9/foundation';
import { RESTResponse } from './RESTResponse';

export interface RESTEndpointBase<
  TRequest,
  TResponse extends RESTResponse<any>
> {
  createHook: (
    cb: (request: TRequest) => Promise<TResponse>,
  ) => Hook<TRequest, TResponse>;
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE';
  pattern: string;
}
