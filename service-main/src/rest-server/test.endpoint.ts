import * as t from 'io-ts';

import { Interface } from '@brendan9/service-foundation';

export interface Params {}

export interface ResponsePayload {}

class TestEndpoint
  implements Interface.RESTGETEndpoint<Params, ResponsePayload> {
  public httpMethod: 'GET' = 'GET';

  public pattern = '/test';

  public tParams = t.type({});

  public tResponse = t.type({});

  public async genCall(
    request: Interface.RESTGETRequest,
  ): Promise<Interface.RESTResponse<ResponsePayload>> {
    const payload: ResponsePayload = {};
    return Interface.RESTResponse.Success(payload);
  }
}

export default new TestEndpoint();
