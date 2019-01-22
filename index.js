const express = require('express');
const bodyParser = require('body-parser');

const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');

const app = express();

app.set('port', process.env.PORT || 5000)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.get('/', verifyWebhook);
app.post('/', messageWebhook);

app.listen(app.get('port'), () => console.log('Express server is listening on port ' + app.get('port')));