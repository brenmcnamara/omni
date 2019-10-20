import * as ReservationRequest from '../../api/ReservationAPI/ReservationRequest.model';
import * as t from 'io-ts';
import API from '../../api';

import { Interface } from '@brendan9/service-foundation';

export interface Params {}

export interface Query {}

export interface ResponsePayload {
  data: ReservationRequest.ModelRaw[];
}

class ReservationRequestsListEndpoint
  implements Interface.RESTGETEndpoint<Params, Query, ResponsePayload> {
  public httpMethod: 'GET' = 'GET';

  public pattern = '/reservationRequests';

  public tParams = t.type({});

  public tQuery = t.type({});

  // TODO: More precise type.
  public tResponse = t.type({
    data: t.any,
  });

  public async genCall(
    request: Interface.RESTGETRequest<Params, Query>,
  ): Promise<Interface.RESTResponse<ResponsePayload>> {
    const [requests, responses] = await Promise.all([
      API.Reservation.genQueryReservationRequest(c =>
        c.where('isDeleted', '==', false).orderBy('createdAt', 'desc'),
      ),
      API.Reservation.genQueryReservationResponses(c =>
        c.where('isDeleted', '==', false),
      ),
    ]);

    const openRequests = requests.filter(
      request =>
        !responses.some(response => response.requestRef.refID === request.id),
    );

    return Interface.RESTResponse.Success({
      data: openRequests.map(m => m.toJSON()),
    });
  }
}

export default new ReservationRequestsListEndpoint();
