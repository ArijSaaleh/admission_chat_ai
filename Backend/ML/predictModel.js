const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');

// Load the model
async function loadModel() {
  const modelPath = 'file://./model/model.json';
  const loadedModel = await tf.loadLayersModel(modelPath);
  console.log('Model loaded.');

  // Load the uniqueWords set from the training data JSON file
  const trainingData = JSON.parse(fs.readFileSync('./preprocessedData.json', 'utf8'));
  const uniqueWords = new Set();
  trainingData.forEach(item => {
    const tokens = item.text.split(' ');
    tokens.forEach(token => uniqueWords.add(token));
  });

  // Set the input size
  const inputSize = loadedModel.layers[0].batchInputShape[1];

  // Example input for prediction
  const inputText = 'good experience at work environment';
  const inputTokens = inputText.split(' ');
  const paddedTokens = inputTokens.slice(0, inputSize).concat(Array(inputSize - inputTokens.length).fill(''));
  const tokenIndices = paddedTokens.map(token => {
    return Array.from(uniqueWords).indexOf(token);
  });
  const inputTensor = tf.tensor2d([tokenIndices], [1, inputSize]);

  // Perform prediction
  const prediction = loadedModel.predict(inputTensor);
  const predictedLabel = prediction.round().dataSync()[0];

  console.log('Prediction:', predictedLabel);
}

loadModel()
  .catch(err => console.error('Error loading model:', err));
