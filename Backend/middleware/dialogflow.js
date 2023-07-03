const dialogflow = require('@google-cloud/dialogflow');
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
        };

        const [response] = await sessionClient.detectIntent(request);
        const intentResponse = response;

        console.log('Detected intent');
        console.log(`Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`);

        return intentResponse;
    } catch (error) {
        console.log('Error:', error);
        throw new Error('Failed to detect intent');
    }
}
async function detectIntentAudioRes(projectId, sessionId, query, languageCode) {
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    // The audio query request
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

    try {
        const responses = await sessionClient.detectIntent(request);
       
        console.log('Detected intent: ', responses[0].queryResult.fulfillmentText);
        const audioFile = responses[0].outputAudio;
        const textOutput = responses[0].queryResult.fulfillmentText;
        await util.promisify(fs.writeFile)(outputFile, audioFile, 'binary');
        console.log(`Audio content written to file: ${outputFile}`);
        return responses
    } catch (error) {
        console.error('Error while detecting intent:', error);
        throw error;
    }
}

module.exports = { detectIntent, detectIntentAudioRes };
