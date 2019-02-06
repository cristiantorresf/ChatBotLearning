module.exports = {

   principal : function (Message,PSID){
   
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
           return true;
         }
         
   
         async function personalizada () {
   
           if (mensajeMinuscula === "Necesito una App personalizada. Me pueden llamar?".toLowerCase() ){
   
             YaOcurrioAsincrono = await EnvieRespuesta({"text": `Hola perfecto,como quieres tu aplicación, para que area la necesitas? :)  
   
             tienes un numero de telefono para contactarte?        
   
             Porque queremos brindarte una asesoria personalizada :)`});
             if (YaOcurrioAsincrono){
           
               response = {"text" : `Este es el orden de anidacion despues de cada pregunta `};    
               
       
             }
                 
                 
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
           
           response = {"text": `No, gracias a ti por dejarnos contribuir en tus metas `}             
         }
     
         if (mensajeMinuscula.includes("mal") || mensajeMinuscula.includes("ahi vamos")){
           
           response = {"text": `como asi :O, por que?, te vas a sentir mejor cuando hagas la pagina con nosotros seguro que si`}
           
         }
          
     
         if (mensajeMinuscula.includes("pagina") || mensajeMinuscula.includes("web")){
           response = {"text": `Bien perfecto, ¿Tienes un número de teléfono en el que te podamos contactar?`}
         }
   
         if (mensajeMinuscula.includes("mierda") || mensajeMinuscula.includes("pendejo") || mensajeMinuscula.includes("estupido") || mensajeMinuscula.includes("marica")|| mensajeMinuscula.includes("papanatas")|| mensajeMinuscula.includes("torombolo")){
           response = {"text": `entiendo que tantas cosas de la vida, cause tu irrespeto, pero trata de no ser grosero los bots tambien tenemos sentimientos`}
         }
   
         if (mensajeMinuscula.includes("precio") || mensajeMinuscula.includes("cuanto vale")){
           
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
   
       // Envie el mensaje respuesta jaja no se le olvide enviar 
       callSendAPI(PSID,response);
      
   }


}



