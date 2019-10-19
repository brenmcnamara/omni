import * as fs from 'fs';
import * as path from 'path';
import * as t from 'io-ts';
import API from './API';

import { JWT, JWTAccess } from 'google-auth-library';

const tConfig = t.type({
  eventCalendarID: t.string,
  scopes: t.array(t.string),
  user: t.string,
});

const tCredentials = t.type({
  auth_provider_x509_cert_url: t.string,
  auth_uri: t.string,
  client_email: t.string,
  client_id: t.string,
  client_x509_cert_url: t.string,
  project_id: t.string,
  private_key: t.string,
  private_key_id: t.string,
  token_uri: t.string,
  type: t.literal('service_account'),
});

export interface Configuration {
  jwt: JWT;
}

const CONFIG_PATH = path.join(__dirname, 'env/config.json');
const CRED_PATH = path.join(__dirname, 'env/service-account-credentials.json');

export async function configure(): Promise<API> {
  const configRaw = JSON.parse(fs.readFileSync(CONFIG_PATH).toString());
  const credRaw = JSON.parse(fs.readFileSync(CRED_PATH).toString());

  const config = leftthrows(tConfig.decode(configRaw));
  const credentials = leftthrows(tCredentials.decode(credRaw));

  const jwt = new JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    config.scopes,
    config.user,
    credentials.private_key_id,
  );

  await jwt.authorize();

  return new API({ jwt });
}

function leftthrows<A>(validation: t.Validation<A>): A {
  switch (validation._tag) {
    case 'Left':
      throw Error('Validation failure');
    case 'Right':
      return validation.right;
  }
}
