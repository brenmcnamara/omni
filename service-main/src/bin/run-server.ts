import API from '../api';
import express from 'express';
import Interface from '../rest-server';
import runSuspendedScript from './utils/runSuspendedScript';

import { Interface as InterfaceType } from '@brendan9/service-foundation';

const PORT = 3000;
const app = express();

runSuspendedScript(async () => {
  console.log('... Configuring API');
  await API.genConfigure();

  console.log('... Setting up rest server endpoints');

  const queue: InterfaceType.NestedEndpoints = Interface.endpoints;
  let nextEndpoint:
    | InterfaceType.RESTEndpoint
    | InterfaceType.NestedEndpoints
    | undefined;

  while ((nextEndpoint = queue.shift())) {
    if (Array.isArray(nextEndpoint)) {
      queue.unshift.apply(queue, nextEndpoint);
    } else {
      buildExpressHandler(app, nextEndpoint);
    }
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

// UTILITIES

function buildExpressHandler(
  app: express.Express,
  endpoint: InterfaceType.RESTEndpoint,
) {
  switch (endpoint.httpMethod) {
    case 'GET':
      app.get(endpoint.pattern, async (req, res) => {
        const request: InterfaceType.RESTGETRequest = {};

        try {
          const response = await endpoint.genCall(request);
          res.status(response.status).json(response.payload);
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          res.status(500).json({ errorMessage });
        }
      });
      break;
  }
}

function getErrorMessage(error: any): string {
  try {
    return error.toString();
  } catch (_) {
    return 'Unknown Error';
  }
}
