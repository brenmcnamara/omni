import * as t from 'io-ts';

import { RESTGETRequest } from './RESTGETRequest';
import { RESTResponse } from './RESTResponse';

export interface RESTGETEndpoint<TParams, TResponsePayload> {
  genCall(request: RESTGETRequest): Promise<RESTResponse<TResponsePayload>>;
  httpMethod: 'GET';
  pattern: string;
  tParams: t.Type<TParams>;
  tResponse: t.Type<TResponsePayload>;
}
