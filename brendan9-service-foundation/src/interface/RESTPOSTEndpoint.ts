import * as t from 'io-ts';

import { RESTPOSTRequest } from './RESTPOSTRequest';
import { RESTResponse } from './RESTResponse';

export interface RESTPostEndpoint<TBody, TResponsePayload> {
  genCall(request: RESTPOSTRequest): Promise<RESTResponse<TResponsePayload>>;
  httpMethod: 'POST';
  pattern: string;
  tBody: t.Type<TBody>;
  tResponse: t.Type<TResponsePayload>;
}
