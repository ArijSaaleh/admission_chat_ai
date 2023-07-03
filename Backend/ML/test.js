// Define positive and negative words
const positiveWords = ["good", "great", "excellent", "positive"];
const negativeWords = ["bad", "terrible", "poor", "negative"];

// Function to perform sentiment analysis
function analyzeSentiment(text) {
  // Split the text into individual words
  const words = text.toLowerCase().split(" ");

  // Count the number of positive and negative words
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach((word) => {
    if (positiveWords.includes(word)) {
      positiveCount++;
    } else if (negativeWords.includes(word)) {
      negativeCount++;
    }
  });

  // Determine the sentiment based on the word counts
  if (positiveCount > negativeCount) {
    return "positive";
  } else if (negativeCount > positiveCount) {
    return "negative";
  } else {
    return "neutral";
  }
}

// Example usage
const text = "I have a horrible feeling about this.";
const sentiment = analyzeSentiment(text);
console.log(sentiment);
