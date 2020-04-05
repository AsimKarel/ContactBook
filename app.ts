import express = require('express');

// Create a new express application instance
const app: express.Application = express();
const controller = require('./Controller/Controller')
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/', controller)

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!');
});