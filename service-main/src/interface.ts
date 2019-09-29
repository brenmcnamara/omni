import * as t from 'io-ts';

import {
  RESTEndpoints,
  RESTInterface,
} from '@nine-point/core-service-foundation/interface';

export default RESTInterface.build({
  endpoints: [
    RESTEndpoints.buildGET({
      pattern: '/',
      tResponse: t.type({
        hello: t.literal('world'),
      }),
    }),
  ],
});
