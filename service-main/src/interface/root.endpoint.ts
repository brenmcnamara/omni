import * as t from 'io-ts';

import { Interface } from '@brendan9/service-foundation';

const { RESTResponse } = Interface;

export interface Params {}

export interface ResponsePayload {
  hello: 'world';
}

class Root implements Interface.RESTGETEndpoint<Params, ResponsePayload> {
  public httpMethod: 'GET' = 'GET';

  public pattern = '/';

  public tParams = t.type({});

  public tResponse = t.type({ hello: t.literal('world') });

  public async genCall(request: Interface.RESTGETRequest) {
    const payload: ResponsePayload = { hello: 'world' };
    return RESTResponse.Success(payload);
  }
}

export default new Root();
