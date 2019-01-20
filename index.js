const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();
app.set('port', process.env.PORT || 5000);



// Body Parser Middleware
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

// Cors MiddleWare wow
app.use(cors());


// Rutas


// FaceBook

app.get('/webhook', (req, res) => {
   if (req.query['hub.verify.token'] === 'EAAcENVVhy9EBAHXetVmwiOXZCHSQY3Ct5oMcvyO3ZAdaDjmZC7G1GzZAvwZANWHeIwLubFUBIdyiFWiqbPHfJxrZAxZAOuIQBKZCQUoMeH0PwO6NcFVCyhoS4hCZCg1SWln4r3radCv9ygywmyssRE6nZCqida7YSq5neyhNRxwwm5AnOCwGOoONZBu') {
      res.send(req.query(['hub.challenge']))
   } else {
      res.send('token invalido');
   }
})


app.listen(app.get('port'), () => {
   console.log(`Servidor a empezado en el puerto ${app.get('port')}`);
});