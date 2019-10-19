import * as t from 'io-ts';
import API from '../../api';

import { Interface } from '@brendan9/service-foundation';
import { calendar_v3 } from 'googleapis';

export interface Params {}

export interface ResponsePayload {
  data: calendar_v3.Schema$CalendarList;
}

class CalendarListEndpoint
  implements Interface.RESTGETEndpoint<Params, ResponsePayload> {
  public httpMethod: 'GET' = 'GET';

  public pattern = '/calendars';

  public tParams = t.type({});

  // TODO: More precise type.
  public tResponse = t.type({
    data: t.any,
  });

  public async genCall(
    request: Interface.RESTGETRequest,
  ): Promise<Interface.RESTResponse<ResponsePayload>> {
    const calendarList = await API.GSuite.Calendar.genFetchCalendars();
    console.log(calendarList);

    const payload: ResponsePayload = { data: calendarList };

    return Interface.RESTResponse.Success(payload);
  }
}

export default new CalendarListEndpoint();
