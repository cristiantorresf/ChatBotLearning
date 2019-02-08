
const googleApi = require('./googleApi');
var rp = require('request-promise');
const dialogflow = require('dialogflow');


const projectId = 'chatbot-b3c86'; 
const sessionId = '123456';
const languageCode = 'en-US';


const config = {
  credentials: {
    private_key: googleApi.private_key,
    client_email: googleApi.client_email
  }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Remember the Page Access Token you got from Facebook earlier?
// Don't forget to add it to your `variables.env` file.




function callSendApiDecision (PSID,response){
   
 
   let request_body = {
     "messaging_type":"MESSAGE_TAG",
     "tag":"NON_PROMOTIONAL_SUBSCRIPTION",  
      "recipient" : {
         "id" :PSID
      },
      "message": response
   };
   let options = {
     method: 'POST',
     uri: 'https://graph.facebook.com/v2.6/me/messages',
     qs: { "access_token": PAGE_ACCESS_TOKEN },
     json: request_body 
    }
    rp(options);
  }

module.exports = (event) => {
 "esta reciviendo el objeto messaging"
  const userId = event.sender.id;
  const message = event.message.text;

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      console.log(`debugging ${result.fulfillmentText} typeof ${typeof result.fulfillmentText} stringify ${JSON.stringify(result.fulfillmentText)}`);
      let response = {"text":result.fulfillmentText};
      return callSendApiDecision(userId,response);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}
