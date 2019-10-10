import * as express from 'express';

import {
  RESTDELETERequest,
  RESTGETRequest,
  RESTPOSTRequest,
  RESTPUTRequest,
} from '@brendan9/service-foundation';

export function buildDELETERequest(
  request: express.Request,
): Promise<RESTDELETERequest> {
  throw Error('Noet yet implemented');
}

export function buildGETRequest(
  request: express.Request,
): Promise<RESTGETRequest> {
  throw Error('Not yet implemented');
}

export function buildPOSTRequest(
  request: express.Request,
): Promise<RESTPOSTRequest> {
  throw Error('Not yet implemeneted');
}

export function buildPUTRequest(
  request: express.Request,
): Promise<RESTPUTRequest> {
  throw Error('Not yet implemented');
}
