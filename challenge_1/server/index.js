/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static('data'));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
