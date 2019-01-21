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

   if (req.query['hub.verify.token'] === 'cristiantorresmitoken') {
      console.log(req.query['hub.verify.token']);
      console.log(req.query['hub.challenge']);
      res.send(req.query['hub.challenge'])
   } else {
      res.send('token invalido');
   }
})


app.listen(app.get('port'), () => {
   console.log(`Servidor a empezado en el puerto ${app.get('port')}`);
});