import express from 'express';
import path from 'path';

import Interface from './interface';

const PORT = 3000;
const app = express();

for (const endpoint of Object.values(Interface.endpoints)) {
  let expressMethodBuilder;
  switch (endpoint.httpMethod) {
    case 'DELETE':
      expressMethodBuilder = app.delete;
      break;
    case 'GET':
      expressMethodBuilder = app.get;
      break;
    case 'POST':
      expressMethodBuilder = app.post;
      break;
    case 'PUT':
      expressMethodBuilder = app.put;
      break;
  }

  expressMethodBuilder(endpoint.pattern, (req, res) => {
    // (1) Process request.
    // (2) Call the hook on the endpoint.
    // (3) Get the response from calling the hook.
    // (4) Pass the req, res pair to the returned response, which should have a method to handle
    //     the express response.
  });
}

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
