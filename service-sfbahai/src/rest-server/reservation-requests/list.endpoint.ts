import * as ReservationRequest from '../../api/ReservationAPI/ReservationRequest.model';
import * as t from 'io-ts';
import API from '../../api';

import { Interface } from '@brendan9/service-foundation';

export interface Params {}

export interface Query {}

export interface ResponsePayload {
  data: ReservationRequest.ModelRaw[];
}

class CalendarListEndpoint
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
    const models = await API.Reservation.genFetchReservationRequests({});
    return Interface.RESTResponse.Success({
      data: models.map(m => m.toJSON()),
    });
  }
}

export default new CalendarListEndpoint();
