const express = require('express');
const bodyParser = require('body-parser');
const slackNotify = require('./slack-notify');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', slackNotify);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});