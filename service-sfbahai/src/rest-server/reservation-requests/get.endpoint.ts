import * as ReservationRequest from '../../api/ReservationAPI/ReservationRequest.model';
import * as t from 'io-ts';
import API from '../../api';

import { Interface } from '@brendan9/service-foundation';

export interface Params {
  id: string;
}

export interface Query {}

export interface ResponsePayload {
  data: ReservationRequest.ModelRaw;
}

class ReservationRequestsGetEndpoint
  implements Interface.RESTGETEndpoint<Params, Query, ResponsePayload> {
  public httpMethod: 'GET' = 'GET';

  public pattern = '/reservationRequests/:id';

  public tParams = t.type({ id: t.string });

  public tQuery = t.type({});

  // TODO: More precise type.
  public tResponse = t.type({
    data: t.any,
  });

  public async genCall(
    request: Interface.RESTGETRequest<Params, Query>,
  ): Promise<Interface.RESTResponse<ResponsePayload>> {
    const model = await API.Reservation.genFetchReservationRequest(
      request.params.id,
    );

    if (!model) {
      throw Interface.RESTResponse.ResourceNotFound({
        errorMessage: 'Resource Not Found',
      });
    }

    return Interface.RESTResponse.Success({ data: model });
  }
}

export default new ReservationRequestsGetEndpoint();
