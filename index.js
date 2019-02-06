'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());
  OrdenChat = require('./chatorder');
  
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const request = require('request');


app.set('port',process.env.PORT || 1337);
// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

   // Your verify token. Should be a random string.
   let VERIFY_TOKEN = "1014238588"
     
   // Parse the query params
   // endpoint?hub.mode=subscribe&hub.verify_token=1014238588&hub.challenge=nose
   let mode = req.query['hub.mode'];
   let token = req.query['hub.verify_token'];
   let challenge = req.query['hub.challenge'];
     
   // Checks if a token and mode is in the query string of the request
   if (mode && token) {
      
     // Checks the mode and token sent is correct
     if (mode === 'subscribe' && token === VERIFY_TOKEN) {
       
       // Responds with the challenge token from the request
       console.log('WEBHOOK_VERIFIED');
       res.status(200).send(challenge);
     
     } else {
       // Responds with '403 Forbidden' if verify tokens do not match
       res.sendStatus(403);      
     }
   }
 });

  
 // Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  

  
 
   let body = req.body;
   console.log(`###################################################`);
   console.log(`###################################################`);
   console.log(`###################################################`);
   console.log(`Imprima todo lo que reciba  ${JSON.stringify(req.body)}`);
   console.log(`###################################################`);
   console.log(`###################################################`);
   console.log(`###################################################`);
 
   // Checks this is an event from a page subscription
   if (body.object === 'page') {
 
     // Iterates over each entry - there may be multiple if batched
     body.entry.forEach(function(entry) {
 
       // Gets the message. entry.messaging is an array, but 
       // will only ever contain one message, so we get index 0
       // req.body.entry
       let webhook_event = entry.messaging[0];
       console.log(webhook_event);
       let sender_psid = webhook_event.sender.id;
       console.log('""""""""""""""""""""""""""""""""""""');
       console.log(`sender_psid => ${sender_psid}`);

       if (webhook_event.message){
          handleMessage(sender_psid,webhook_event.message);
          console.log('funcion');
       } else if (webhook_event.postback){
          handlePostback(sender_psid,webhook_event.postback);
          console.log('postback function');
       }
      

     });
 
     // Returns a '200 OK' response to all requests
     res.status(200).send('EVENT_RECEIVED');
   } else {
     // Returns a '404 Not Found' if event is not from a page subscription
     res.sendStatus(404);
   }
 
 });

 function callSendAPI (PSID,response){
    // construye el cuerpo del mensaje en JSON
    let request_body = {
      "messaging_type":"MESSAGE_TAG",
      "tag":"NON_PROMOTIONAL_SUBSCRIPTION",  
       "recipient" : {
          "id" :PSID
       },
       "message": response
    } 
    // Send the HTTP request to the Messenger platform 
    
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    },(err,res,body)=>{
      if (!err){console.log('Mensaje Enviado');}
      else {console.log('hay un error '+err);}
    });

 }

 //matematica basica para anidaciones
 let a=0;
 let b=0;
 let c=0;
 // Desgraciadamente todo corre asincrono y no secuencial por eso jode el orden 
 // esta variable guarda si ya se disparo el orden, lo hice anterior pero chimbero  
 let YaOcurrioAsincrono = false;
 let no=false;
 function one (PSID,response){
   console.log("primero");
   callSendAPI(PSID,response);
 }
 function two (PSID,response){
   console.log("segundo");
   callSendAPI(PSID,response);
 }
 function three (PSID,response) {
   console.log("tercero");
   callSendAPI(PSID,response);
 }
 function four (PSID,response){
   console.log("cuarto");
   callSendAPI(PSID,response);
 }
 
 
 function handleMessage(PSID,Message){
  let response;
  OrdenChat.principal(Message,PSID);

 

        
 }
 function handlePostback(PSID,Postback){
    let response;
    // Get the payload for the postback
    let payload = Postback.payload;
   // Set the response based on the postback payload
   if (payload === "yes"){
      response = { "text": "Gracias!" }

   } else if (payload === "no"){
      response = { "text": "Oops, Intenta enviar otra imagen." }
   }
   // mande al API
   callSendAPI(PSID,response);
 }
 
 




// creates express http server
// Sets server port and logs message on success
app.listen(app.get('port'), () => console.log(`webhook is listening on port ${app.get('port')}`));