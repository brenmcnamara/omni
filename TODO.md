# TODO

**PROGRESS:**

- [] Define Rest Server Interface

  - [] Make sure that rest build api is setup
  - [] Explore Justin's patterns for defining routes
  - [] Plugin rest interface with express server

- [] Define service and api for downloading secure keys
  - [] Is there anything I can use to serve static files securely? Would like
    to serve json files with secure credentials.
  - [] Define script in api modules which pull some access token from the
    env variables and use it to download api keys and place them into ENV
    variables under namespace.
  - [] Implement this functionality for Firestore API
  - [] Implement this functionality for GSuite API
