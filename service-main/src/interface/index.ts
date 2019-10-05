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
