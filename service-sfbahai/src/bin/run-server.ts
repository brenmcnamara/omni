import * as t from 'io-ts';
import API from '../api';
import express from 'express';
import Interface from '../rest-server';
import runSuspendedScript from './utils/runSuspendedScript';

import { Interface as InterfaceType } from '@brendan9/service-foundation';
import { either } from 'fp-ts';

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
      app.get(
        endpoint.pattern,
        createRequestHandler(endpoint, async (req, res) => {
          const request: InterfaceType.RESTGETRequest<any, any> = {
            params: req.params,
            query: req.query,
          };

          const response = await endpoint.genCall(request);
          res.status(response.status).json(response.payload);
        }),
      );
      break;

    case 'POST':
      app.post(
        endpoint.pattern,
        createRequestHandler(endpoint, async (req, res) => {
          const request: InterfaceType.RESTPOSTRequest<any, any, any> = {
            body: req.body,
            params: req.params,
            query: req.query,
          };

          const response = await endpoint.genCall(request);
          res.status(response.status).json(response.payload);
        }),
      );
  }
}

function createRequestHandler(
  endpoint: InterfaceType.RESTEndpoint,
  cb: (req: express.Request, res: express.Response) => Promise<void>,
) {
  return async (req: express.Request, res: express.Response) => {
    try {
      validateRequest(endpoint, req);
      await cb(req, res);
    } catch (error) {
      handleError(res, error);
      return;
    }
  };
}

function validateRequest(
  endpoint: InterfaceType.RESTEndpoint,
  req: express.Request,
) {
  switch (endpoint.httpMethod) {
    case 'GET': {
      const decodedQuery = endpoint.tQuery.decode(req.query);
      if (tIsError(decodedQuery)) {
        throw InterfaceType.RESTResponse.BadRequest({
          errorMessage: 'Bad Request Query',
        });
      }

      const decodedParams = endpoint.tParams.decode(req.params);
      if (tIsError(decodedParams)) {
        throw InterfaceType.RESTResponse.BadRequest({
          errorMessage: 'Bad Request Params',
        });
      }
      break;
    }

    case 'POST': {
      const decodedQuery = endpoint.tQuery.decode(req.query);
      if (tIsError(decodedQuery)) {
        throw InterfaceType.RESTResponse.BadRequest({
          errorMessage: 'Bad Request Query',
        });
      }

      const decodedParams = endpoint.tParams.decode(req.params);
      if (tIsError(decodedParams)) {
        throw InterfaceType.RESTResponse.BadRequest({
          erroressage: 'Bad Request Params',
        });
      }

      const decodedBody = endpoint.tBody.decode(req.body);
      if (tIsError(decodedBody)) {
        throw InterfaceType.RESTResponse.BadRequest({
          errorMessage: 'Bad Request Body',
        });
      }
      break;
    }
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

function tIsError(either: either.Either<t.Errors, any>): boolean {
  return either._tag === 'Left';
}
