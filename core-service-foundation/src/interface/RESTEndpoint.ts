import * as t from 'io-ts';

import { RESTGETEndpointHook } from './RESTGETEndpointHook';

interface RESTEndpointOptions$GET<TPattern extends string, TResponse> {
  pattern: TPattern;
  tResponse: t.Type<TResponse>;
}

export class RESTEndpoint<TResponsePayload> {
  private _Hook: RESTGETEndpointHook<TResponsePayload>;
  private options: RESTEndpointOptions$GET<any, any>;

  constructor(options: RESTEndpointOptions$GET<any, any>) {
    this._Hook = new RESTGETEndpointHook({ tResponse: options.tResponse });
    this.options = options;
  }

  static buildGET<TPattern extends string, TResponsePayload>(
    options: RESTEndpointOptions$GET<TPattern, TResponsePayload>,
  ): RESTEndpoint<TResponsePayload> {
    return new RESTEndpoint(options);
  }

  public get Hook(): RESTGETEndpointHook<TResponsePayload> {
    return this._Hook;
  }
}
