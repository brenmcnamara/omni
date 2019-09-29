import express from 'express';
import path from 'path';

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
