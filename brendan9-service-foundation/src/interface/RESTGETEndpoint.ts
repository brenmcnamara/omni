import * as t from 'io-ts';

import { Hook } from '@brendan9/foundation';
import { RESTEndpoint } from './RESTEndpoint';
import { RESTGETEndpointHook } from './RESTGETEndpointHook';
import { RESTGETRequest } from './RESTGETRequest';
import { RESTResponse } from './RESTResponse';

interface RESTGETEndpointOptions<
  TPattern extends string,
  TParamsPayload,
  TResponsePayload
> {
  pattern: TPattern;
  tParams: t.Type<TParamsPayload>;
  tResponse: t.Type<TResponsePayload>;
}

export class RESTGETEndpoint<TParamsPayload, TResponsePayload>
  implements RESTEndpoint<RESTGETRequest, RESTResponse<TResponsePayload>> {
  private hook: RESTGETEndpointHook<TResponsePayload> | null = null;

  private options: RESTGETEndpointOptions<
    any,
    TParamsPayload,
    TResponsePayload
  >;

  constructor(
    options: RESTGETEndpointOptions<any, TParamsPayload, TResponsePayload>,
  ) {
    this.options = options;
  }

  static build<TPattern extends string, TParamsPayload, TResponsePayload>(
    options: RESTGETEndpointOptions<TPattern, TParamsPayload, TResponsePayload>,
  ): RESTGETEndpoint<TParamsPayload, TResponsePayload> {
    return new RESTGETEndpoint(options);
  }

  public get httpMethod(): 'GET' {
    return 'GET';
  }

  public get pattern(): string {
    return this.options.pattern;
  }

  public async genCall(
    request: RESTGETRequest,
  ): Promise<RESTResponse<TResponsePayload>> {
    if (!this.hook) {
      throw Error('Cannot call endpoint that has no hook created');
    }
    return await this.hook.genCall(request);
  }

  public createHook(
    cb: (request: RESTGETRequest) => Promise<RESTResponse<TResponsePayload>>,
  ): Hook<RESTGETRequest, RESTResponse<TResponsePayload>> {
    if (this.hook) {
      throw Error('Cannot create more than one hook per GET');
    }

    const hook = new RESTGETEndpointHook<TResponsePayload>({});

    const onNext = cb;
    const onCompletion = async () => {};
    const onError = async () => {};

    hook.register({ onCompletion, onError, onNext });

    this.hook = hook;

    return hook;
  }
}
