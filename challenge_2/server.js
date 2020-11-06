/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = 1337;

app.use(express.static('public'));

// app.get('/priceData', (req, res) => {

// })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
