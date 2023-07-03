const fs = require('fs');
const natural = require('natural');
const tf = require('@tensorflow/tfjs-node');

// Read the training data JSON file
const trainingData = JSON.parse(fs.readFileSync('./preprocessedData.json', 'utf8'));

const uniqueWords = new Set();
trainingData.forEach(item => {
    const tokens = item.text.split(' ');
    tokens.forEach(token => uniqueWords.add(token));
});

const inputSize = uniqueWords.size;
console.log('Input size:', inputSize);

// Convert the training data to tensors
const texts = trainingData.map(item => item.text);
const labels = trainingData.map(item => item.label);
const textTensor = tf.tensor2d(texts.map(text => {
    const tokens = text.split(' ');
    const paddedTokens = tokens.slice(0, inputSize).concat(Array(inputSize - tokens.length).fill(''));
    const tokenIndices = paddedTokens.map(token => {
        return Array.from(uniqueWords).indexOf(token);
    });
    return tokenIndices;
}), [texts.length, inputSize]);

const labelTensor = tf.tensor1d(labels);
console.log('Text tensor shape:', textTensor.shape);
console.log('Label tensor shape:', labelTensor.shape);

// Define the model architecture
const model = tf.sequential();
model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [inputSize] }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

// Compile the model
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

// Train the model
async function trainModel() {
    await model.fit(textTensor, labelTensor, { epochs: 10, batchSize: 32 });
    console.log('Model training completed.');

    // Save the trained model in the current directory
    const modelPath = 'file://./model';
    await model.save(modelPath);
    console.log('Model saved.');
}


trainModel()
    .catch(err => console.error('Error during model training:', err));
