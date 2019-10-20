import * as t from 'io-ts';

import { RESTGETRequest } from './RESTGETRequest';
import { RESTResponse } from './RESTResponse';

export interface RESTGETEndpoint<TParams, TQuery, TResponsePayload> {
  genCall(
    request: RESTGETRequest<TParams, TQuery>,
  ): Promise<RESTResponse<TResponsePayload>>;
  httpMethod: 'GET';
  pattern: string;
  tParams: t.Type<TParams>;
  tQuery: t.Type<TQuery>;
  tResponse: t.Type<TResponsePayload>;
}
