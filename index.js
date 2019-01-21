const express = require('express');
const bodyParser = require('body-parser');

const request = require('request');

const app = express();
app.set('port', process.env.PORT || 5000);



// Body Parser Middleware
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());



// Rutas
app.get('/', (req, res) => {
   res.send('hola bienvenido al servidor');
})


// FaceBook

app.get('/webhook', (req, res) => {
   let VERIFY_TOKEN = 'cristiantorresmitoken';

   let mode = req.query['hub.mode'];
   let token = req.query['hub.verify_token'];
   let challenge = req.query['hub.challenge'];

   if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
   } else {
      res.sendStatus(403);
   }
});






app.listen(app.get('port'), () => {
   console.log(`Servidor a empezado en el puerto ${app.get('port')}`);
});