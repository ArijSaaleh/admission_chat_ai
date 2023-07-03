/*const dialogflow = require('@google-cloud/dialogflow');
const util = require('util');
const fs = require('fs');
const sessionClient = new dialogflow.SessionsClient();
outputFile = 'output.wav'
async function detectIntent(projectId, sessionId, query, languageCode) {
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    try {
        console.log(`Sending Query: ${query}`);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: languageCode,
                },
            },
            outputAudioConfig: {
                audioEncoding: 'OUTPUT_AUDIO_ENCODING_LINEAR_16',
            },
        };
    }
}*/

/***********front */
/*sendMessage() {
    const userMessage = this.userInput;
    if (userMessage) {
      this.messages.push({ sender: 'user', text: userMessage });
      this.userInput = '';
  
      this.chatService.sendUserMessage(userMessage).subscribe(
        (response: HttpResponse<ArrayBuffer>) => {
          console.log(response);
  
          //const assistantMessage = response.body.fulfillmentText;
         // this.messages.push({ sender: 'assistant', text: assistantMessage });
  
          const audioData = response.body;
          if (audioData) {
            this.playAudio(audioData);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }*/