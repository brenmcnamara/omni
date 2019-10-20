import calendar from './calendar';
import reservationRequests from './reservation-requests';
import test from './test.endpoint';

import { Interface } from '@brendan9/service-foundation';

const { RESTInterface } = Interface;

export default RESTInterface.build({
  endpoints: [calendar, reservationRequests, test],
});
