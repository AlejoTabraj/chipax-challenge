const express = require('express');
const main = require('./routes/main');
const app = express();

app.use(express.json());
app.use('/', main);

app.listen('3000', () => {
  console.log('Running server in port 3000');
});
