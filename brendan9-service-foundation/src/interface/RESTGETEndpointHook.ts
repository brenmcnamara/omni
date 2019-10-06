import * as t from 'io-ts';

import { Hook, HookOptions, Subscription } from '@brendan9/foundation';
import { RESTGETRequest } from './RESTGETRequest';
import { RESTResponse } from './RESTResponse';

interface RESTGETEndpointHookOptions<TResponsePayload> {}

export class RESTGETEndpointHook<TResponsePayload>
  implements Hook<RESTGETRequest, RESTResponse<TResponsePayload>> {
  private hookOptions: HookOptions<
    RESTGETRequest,
    RESTResponse<TResponsePayload>
  > | null = null;
  private options: RESTGETEndpointHookOptions<TResponsePayload>;

  constructor(options: RESTGETEndpointHookOptions<TResponsePayload>) {
    this.options = options;
  }

  public register(
    options: HookOptions<RESTGETRequest, RESTResponse<TResponsePayload>>,
  ): Subscription {
    if (this.hookOptions) {
      throw Error('Cannot register more than once for an endpoint hook');
    }

    this.hookOptions = options;

    return {
      remove: () => {
        if (this.hookOptions === options) {
          this.hookOptions = null;
        }
      },
    };
  }

  public async genCall(
    request: RESTGETRequest,
  ): Promise<RESTResponse<TResponsePayload>> {
    const { hookOptions } = this;

    if (!hookOptions) {
      throw Error('Must register with hook before calling');
    }

    return await hookOptions.onNext(request);
  }
}
