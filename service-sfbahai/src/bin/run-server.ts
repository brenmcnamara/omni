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
        console.log(req.params, req.query);
        const request: InterfaceType.RESTGETRequest<any> = { params: {} };

        try {
          const response = await endpoint.genCall(request);
          res.status(response.status).json(response.payload);
        } catch (error) {
          handleError(res, error);
        }
      });
      break;
  }
}

function handleError(res: express.Response, error: any) {
  let errorResponse: InterfaceType.RESTResponse<any>;

  if (error instanceof InterfaceType.RESTResponse) {
    if (error.status < 400) {
      errorResponse = InterfaceType.RESTResponse.ServerError({
        errorMessage: 'Trying to throw successful response',
      });
    } else {
      errorResponse = error;
    }
  } else {
    errorResponse = InterfaceType.RESTResponse.ServerError({
      errorMessage: getErrorMessage(error),
    });
  }

  res.status(errorResponse.status).json(errorResponse.payload);
}

function getErrorMessage(error: any): string {
  try {
    return error.toString();
  } catch (_) {
    return 'Unknown Error';
  }
}
