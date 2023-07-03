const df = require('../middleware/dialogflow');
const router = require("express").Router();
require('dotenv').config();

const projectId = process.env.PROJECT_ID;
const sessionId = process.env.SESSION_ID;

// Testing query df
router.post('/chat', async (req, res) => {
  try {
    // Extract intent data from the request body
    const { intent } = req.body;

    // Call the detectIntent function from dialogflow.js
    const intentResponse = await df.detectIntent(projectId, sessionId, intent, "en-US");
    const fulfillmentText = intentResponse.queryResult.fulfillmentText;

    // Send the fulfillment text in the response
    res.status(201).send({ fulfillmentText });
  } catch (error) {
    // Handle error
    res.status(400).json({ error: error.message });
  }
});
/** testing the audio */
router.post('/chatAudio', async (req, res) => {
  try {
    // Extract intent data from the request body
    const { intent } = req.body;

    // Call the AudioRes function from dialogflow.js
    const Response = await df.detectIntentAudioRes(projectId, sessionId, intent, "en-US");
    
    // Set the appropriate headers for audio response
    /*res.set({
      'Content-Type': 'audio/wav',
      'Content-Length': audioResponse.length
    });*/
    
    // Send the audio response
    res.status(200).send(Response);
  } catch (error) {
    // Handle error
    console.error('Error in /audio route:', error);
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
