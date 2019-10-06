import * as t from 'io-ts';

import { Hook } from '@brendan9/foundation';
import { RESTEndpoint } from './RESTEndpoint';
import { RESTGETEndpointHook } from './RESTGETEndpointHook';
import { RESTGETRequest } from './RESTGETRequest';
import { RESTResponse } from './RESTResponse';

interface RESTGETEndpointOptions<TPattern extends string, TResponse> {
  pattern: TPattern;
  tResponse: t.Type<TResponse>;
}

export class RESTGETEndpoint<TResponsePayload>
  implements RESTEndpoint<RESTGETRequest, RESTResponse<TResponsePayload>> {
  private hook: RESTGETEndpointHook<TResponsePayload> | null = null;
  
  private options: RESTGETEndpointOptions<any, any>;

  constructor(options: RESTGETEndpointOptions<any, any>) {
    this.options = options;
  }

  static build<TPattern extends string, TResponsePayload>(
    options: RESTGETEndpointOptions<TPattern, TResponsePayload>,
  ): RESTGETEndpoint<TResponsePayload> {
    return new RESTGETEndpoint(options);
  }

  public get httpMethod(): 'GET' {
    return 'GET';
  }

  public get pattern(): string {
    return this.options.pattern;
  }

  public createHook(
    cb: (request: RESTGETRequest) => Promise<RESTResponse<TResponsePayload>>,
  ): Hook<RESTGETRequest, RESTResponse> {
    if (this.hook) {
      throw Error('Cannot create more than one hook per GET');
    }

    const hook = new RESTGETEndpointHook({ tResponse: this.options.tResponse });

    const onNext = cb;
    const onCompletion = async () => {};
    const onError = async () => {};

    hook.register({ onCompletion, onError, onNext });

    this.hook = hook;

    return hook;
  }
}
