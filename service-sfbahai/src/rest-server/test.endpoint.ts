import * as t from 'io-ts';

import { Interface } from '@brendan9/service-foundation';

export interface Params {
  id: string;
}

export interface Query {}

export interface ResponsePayload {}

class TestEndpoint
  implements Interface.RESTGETEndpoint<Params, Query, ResponsePayload> {
  public httpMethod: 'GET' = 'GET';

  public pattern = '/test/:id';

  public tParams = t.type({ id: t.string });

  public tQuery = t.type({});

  public tResponse = t.type({});

  public async genCall(
    request: Interface.RESTGETRequest<Params, Query>,
  ): Promise<Interface.RESTResponse<ResponsePayload>> {
    const payload: ResponsePayload = {};
    return Interface.RESTResponse.Success(payload);
  }
}

export default new TestEndpoint();
