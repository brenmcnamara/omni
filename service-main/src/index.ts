import * as RequestBuilder from './RequestBuilder';
import express from 'express';
import Interface from './interface';

import { Interface as InterfaceType } from '@brendan9/service-foundation';

const PORT = 3000;
const app = express();

for (const endpoint of Object.values(Interface.endpoints)) {
  buildExpressHandler(app, endpoint);
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// UTILITIES

function buildExpressHandler(
  app: express.Express,
  endpoint: InterfaceType.RESTEndpoint,
) {
  switch (endpoint.httpMethod) {
    case 'GET':
      app.get(endpoint.pattern, async (req, res) => {
        const request = RequestBuilder.buildGETRequest(req);
        const response = await endpoint.genCall(request);
        // TODO: Should make this more general than just JSON.
        res.status(response.status).json(response.payload);
      });
      break;
  }
}
