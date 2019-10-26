import * as t from 'io-ts';

import { RESTPOSTRequest } from './RESTPOSTRequest';
import { RESTResponse } from './RESTResponse';

export interface RESTPOSTEndpoint<TParams, TQuery, TBody, TResponsePayload> {
  genCall(
    request: RESTPOSTRequest<TParams, TQuery, TBody>,
  ): Promise<RESTResponse<TResponsePayload>>;
  httpMethod: 'POST';
  pattern: string;
  tBody: t.Type<TBody>;
  tParams: t.Type<TParams>;
  tQuery: t.Type<TQuery>;
  tResponse: t.Type<TResponsePayload>;
}
