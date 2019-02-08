
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

// Remember the Page Access Token you got from Facebook earlier?
// Don't forget to add it to your `variables.env` file.
const { FACEBOOK_ACCESS_TOKEN } = process.env;

const sendTextMessage = (userId, text) => {
  return fetch(
    `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        messaging_type: 'RESPONSE',
        recipient: {
          id: userId,
        },
        message: {
          text,
        },
      }),
    }
  );
}

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
      return callSendApiDecision(userId, result.fulfillmentText);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}
