import * as t from 'io-ts';

import { Interface } from '@brendan9/service-foundation';

const { RESTGETEndpoint, RESTInterface } = Interface;

export default RESTInterface.build({
  endpoints: {
    root: RESTGETEndpoint.build({
      pattern: '/',
      tParams: t.type({}),
      tResponse: t.type({
        hello: t.literal('world'),
      }),
    }),
  },
});
