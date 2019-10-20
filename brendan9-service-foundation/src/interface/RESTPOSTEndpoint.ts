import * as t from 'io-ts';

import { RESTPOSTRequest } from './RESTPOSTRequest';
import { RESTResponse } from './RESTResponse';

export interface RESTPOSTEndpoint<TParams, TBody, TQuery, TResponsePayload> {
  genCall(
    request: RESTPOSTRequest<TParams, TQuery, TBody>,
  ): Promise<RESTResponse<TResponsePayload>>;
  httpMethod: 'POST';
  pattern: string;
  tBody: t.Type<TBody>;
  tResponse: t.Type<TResponsePayload>;
}
