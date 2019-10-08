import * as t from 'io-ts';

import {
  RESTGETEndpoint,
  RESTInterface,
} from '@brendan9/service-foundation/interface';

export default RESTInterface.build({
  endpoints: {
    root: RESTGETEndpoint.build({
      pattern: '/',
      tResponse: t.type({
        hello: t.literal('world'),
      }),
    }),
  },
});

const path = route`brendan/${{ id: t.string }}`;

function route<T>(...obj: Array<T>) {}
