'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());
  
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
          console.log('funcion')
       } else if (webhook_event.postback){
          handlePostback(sender_psid,webhook_event.postback);
          console.log('postback function')
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
 
 
 function handleMessage(PSID,Message){
    let response;
    
    
    
    

      
    
    // mira si el mensaje contiene texto
    if (Message.text){
      let mensajeMinuscula= Message.text.toLowerCase(); 
       // creando un payload 

      function hayNumero (mensaje){
        let regex3 = /\b(\d{10}|\d{3}\s\d{4}\s\d{3}|\d{3}\s\d{7}|\d{3}\s\d{3}\s\d{4})\b/; 
        let booleano = mensaje.search(regex3);
         if (booleano > -1){
           console.log('el mensaje tiene numero valido')
          let numero = mensaje.match(regex3)[0];
          response = {"text": `Perfecto, he recibido tu numero de celular, pronto me contactare con tigo a este número  ${numero}. Gracias :)`}
         }
        }
      // coje el numero de telefono  
      hayNumero(mensajeMinuscula); 

      if (Message.text === "Hola"){
        response = {"text": `Buenas como estas :)`}
      }
      if (Message.text === "hola"){
        response = {"text": `Buenas como estas :)`}
      }
        
      if (mensajeMinuscula.includes("hola")){
        response = {"text": `Hola como estas ? :)`}
      }

      function EnvieRespuesta (responseObjeto){
        response = responseObjeto;
      }
      

      async function personalizada () {

        if (mensajeMinuscula === "Necesito una App personalizada. Me pueden llamar?".toLowerCase() ){
          let YaOcurrioAsincrono = await EnvieRespuesta({"text": `Hola perfecto,como quieres tu aplicación, para que area la necesitas? :)
          
          tienes un numero de telefono para contactarte?
          
          Porque queremos brindarte una asesoria personalizada :)`});
          //debugging
          console.log("99999999999999999999999999999999999999999999");
          console.log("99999999999999999999999999999999999999999999");
          console.log("99999999999999999999999999999999999999999999");
          console.log(YaOcurrioAsincrono);  
          console.log("99999999999999999999999999999999999999999999");
          console.log("99999999999999999999999999999999999999999999");
          console.log("99999999999999999999999999999999999999999999");      
              
         }        
      }

      // asincrona function
      personalizada();

      

      

      
      
      if (mensajeMinuscula.includes("buenos dias") || mensajeMinuscula.includes("buenos días ")|| mensajeMinuscula.includes("buen día ")){
        response = {"text": `Muy buenos días, Como estas? :) Estamos a tu servicio, tienes un numero de telefono para contactarte? 
        por que queremos brindarte una asesoria personalizada,:)`}
      }

      if (mensajeMinuscula.includes("buenas tardes") || mensajeMinuscula.includes("buena tarde")){
        response = {"text": `Muy buenos tardes espero que haya tenido un buen almuerzo, Como estas? :)`}
      }

      if (mensajeMinuscula.includes("buenas noches") || mensajeMinuscula.includes("buena noche")){
        response = {"text": `Muy buenos noches que frio que esta haciendo cierto, Como estas? :)`}
      }
      if (mensajeMinuscula.includes("ja") || mensajeMinuscula.includes("jaja") || mensajeMinuscula.includes("jajaja")){
        response = {"text": `😄 jeje`}
      }

     
      function ok (){
        if (mensajeMinuscula.includes("ok") || mensajeMinuscula.includes("que bien") || mensajeMinuscula.includes("que bueno")){
        
          
          response = {"text": `Claro que si, no tienes idea de lo poderoso que es hoy en dia contar con pagina web, tendras super poderes digitales`};
        
      }}

      function siga (){
        b=0;
        if (mensajeMinuscula.includes("mierda") || mensajeMinuscula.includes("pendejo") || mensajeMinuscula.includes("estupido") || mensajeMinuscula.includes("marica")|| mensajeMinuscula.includes("papanatas")|| mensajeMinuscula.includes("torombolo")){
          response = {"text": `entiendo que tantas cosas de la vida, cause tu irrespeto, pero trata de no ser grosero los bots tambien tenemos sentimientos`}
        }
        if (mensajeMinuscula.includes("buena") || mensajeMinuscula.includes("me gusta")|| mensajeMinuscula.includes("genial")|| mensajeMinuscula.includes("super")|| mensajeMinuscula.includes("ok")){
          response = {"text": `Perfecto para comenzar, si quieres dejame tu contacto y te explicare mas detalladamente del modus operandi `}
        }

        if (mensajeMinuscula.includes("mala") || mensajeMinuscula.includes("no me interesa")|| mensajeMinuscula.includes("no estoy interesado")|| mensajeMinuscula.includes("no estoy interesada")|| mensajeMinuscula.includes("dejame miro")|| mensajeMinuscula.includes("yo te avizo")){
          response = {"text": `Animate por ser solo tu y meterte al paquete de paginas felices te dare un descuento espectacular y tendras una pagina personalizada y monitoriada, con base de datos como las grandes ligas, asi que no se diga mas dejame tu telefono o llamame al 3022735255 y empezemos pues `}
        }
      }

      
  
      if (mensajeMinuscula.includes("bien") || mensajeMinuscula.includes("super") || mensajeMinuscula.includes("excelente")){
        a =1;
        response = {"text": `Me alegra que te encuentres bien, y aun te vas a sentir mucho mejor cuando tengas tu pagina personalizada profesional que te impulse tus metas! `
        } 
        ok();            
      }

      if (mensajeMinuscula.includes("gracias") || mensajeMinuscula.includes("muy amable") || mensajeMinuscula.includes("excelente")){
        a =1;
        response = {"text": `No, gracias a ti por dejarnos contribuir en tus metas `}             
      }

      if (a){
        a=0;
        ok();
      }

      if (b){
        siga();
      }

      
  
      if (mensajeMinuscula.includes("mal") || mensajeMinuscula.includes("ahi vamos")){
        a=1;
        response = {"text": `como asi :O, por que?, te vas a sentir mejor cuando hagas la pagina con nosotros seguro que si`}
        
      }

     
  
      if (mensajeMinuscula.includes("pagina") || mensajeMinuscula.includes("web")){
        response = {"text": `Bien perfecto, ¿Tienes un número de teléfono en el que te podamos contactar?`}
      }

      if (mensajeMinuscula.includes("mierda") || mensajeMinuscula.includes("pendejo") || mensajeMinuscula.includes("estupido") || mensajeMinuscula.includes("marica")|| mensajeMinuscula.includes("papanatas")|| mensajeMinuscula.includes("torombolo")){
        response = {"text": `entiendo que tantas cosas de la vida, cause tu irrespeto, pero trata de no ser grosero los bots tambien tenemos sentimientos`}
      }

      if (mensajeMinuscula.includes("precio") || mensajeMinuscula.includes("cuanto vale")){
        b=1;
        response = {"text": `No te preocupes por el precio, la pagina que desarrollamos le da tanto valor agregado a tu empresa o persona que lo veras como una excelente inversion, Que tal te parece la idea?`}       

      }      

       

    } 

    else if (Message.attachments){
       let attachment_url = Message.attachments[0].payload.url;
       response = {
         "attachment": {
           "type": "template",
           "payload": {
             "template_type": "generic",
             "elements": [{
               "title": "Bonita imagen!",
               "subtitle": "Presiona un boton para responder.",
               "image_url": attachment_url,
               "buttons": [
                 {
                   "type": "postback",
                   "title": "Yes!",
                   "payload": "yes",
                 },
                 {
                   "type": "postback",
                   "title": "No!",
                   "payload": "no",
                 }
               ],
             }]
           }
         }
       }

       if (Message.attachments[0].payload.url === "https://scontent.xx.fbcdn.net/v/t39.1997-6/39178562_1505197616293642_5411344281094848512_n.png?_nc_cat=1&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent.xx&oh=63841a4120770a6d44673f1227a0dd4b&oe=5CB76075"){
         response = {"text": `Uy manito arriba, simbolo de alegria, sabes que deja tu celu y horario en el que te pueda contactar por fa`}
       }
    }

    // Envie el mensaje respuesta
    callSendAPI(PSID,response);
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