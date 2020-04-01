import express = require('express');

// Create a new express application instance
const app: express.Application = express();
const controller = require('./Controller/Controller')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/', controller)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});