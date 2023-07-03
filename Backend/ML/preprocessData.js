const fs = require('fs');
const natural = require('natural');
const StopwordsFilter = require('node-stopwords-filter');

// Read the training data JSON file
const trainingData = JSON.parse(fs.readFileSync('./trainingData.json', 'utf8'));

// Preprocess the data
const processedData = trainingData.data.map(item => ({
  text: preprocessText(item.text),
  label: item.label === 'positive' ? 1 : 0
}));

// Save the preprocessed data to a new file
fs.writeFileSync('./preprocessedData.json', JSON.stringify(processedData), 'utf8');

console.log('Preprocessing completed.');

// Function to preprocess text
function preprocessText(text) {
  // Convert to lowercase
  text = text.toLowerCase();

  // Tokenize the text
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text).toString();
 
  // Remove stopwords
  const stopwordsFilter = new StopwordsFilter();
  const filteredTokens = stopwordsFilter.filter(tokens);
/*
  // Perform stemming
  const stemmer = natural.PorterStemmer;
  console.log(filteredTokens)
  const stemmedTokens = filteredTokens.map(token => stemmer.stem(token));
*/
  // Join the tokens back to a string
  return filteredTokens.join(' ');
}
