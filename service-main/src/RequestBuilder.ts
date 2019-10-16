import * as express from 'express';

import { Interface } from '@brendan9/service-foundation';

export function buildDELETERequest(
  request: express.Request,
): Promise<Interface.RESTDELETERequest> {
  throw Error('Not yet implemented');
}

export function buildGETRequest(
  request: express.Request,
): Promise<Interface.RESTGETRequest> {
  return Promise.resolve({});
}

export function buildPOSTRequest(
  request: express.Request,
): Promise<Interface.RESTPOSTRequest> {
  throw Error('Not yet implemeneted');
}

export function buildPUTRequest(
  request: express.Request,
): Promise<Interface.RESTPUTRequest> {
  throw Error('Not yet implemented');
}
