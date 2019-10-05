import * as t from 'io-ts';

import { Hook } from '@brendan9/foundation';
import { RESTGETRequest } from './RESTGETRequest';
import { RESTResponse } from './RESTResponse';

interface RESTGETEndpointHookOptions<TResponsePayload> {
  tResponse: t.Type<TResponsePayload>;
}

export class RESTGETEndpointHook<TResponsePayload>
  implements Hook<RESTGETRequest, RESTResponse<TResponsePayload>> {
  private options: RESTGETEndpointHookOptions<TResponsePayload>;

  constructor(options: RESTGETEndpointHookOptions<TResponsePayload>) {
    this.options = options;
  }
}
