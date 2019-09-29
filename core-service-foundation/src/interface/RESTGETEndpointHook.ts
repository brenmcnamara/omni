import * as t from 'io-ts';

import { RESTGETRequest } from './RESTGETRequest';
import { RESTResponse } from './RESTResponse';
import { Subscription } from '@nine-point/core-foundation';

interface RESTGETEndpointHookOptions<TResponsePayload> {
  tResponse: t.Type<TResponsePayload>;
}

export class RESTGETEndpointHook<TResponsePayload> {
  private callback:
    | ((request: RESTGETRequest) => RESTResponse<TResponsePayload>)
    | null = null;
  private options: RESTGETEndpointHookOptions<TResponsePayload>;

  constructor(options: RESTGETEndpointHookOptions<TResponsePayload>) {
    this.options = options;
  }

  public get hasSubscriber(): boolean {
    return Boolean(this.callback);
  }

  public call(request: RESTGETRequest) {}

  public subscribe(
    callback: (request: RESTGETRequest) => Promise<TResponsePayload>,
  ): Subscription {
    if (this.hasSubscriber) {
      throw Error('REST Endpoint Hooks do not support multiple subscribers');
    }

    this.callback = callback;

    return {
      remove: () => {
        if (this.callback === callback) {
          this.callback = null;
        }
      },
    };
  }
}
