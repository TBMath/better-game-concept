// /c:/Users/mukta/OneDrive/Desktop/better-game-concept/backend/functions/questions.js

// Function to get a random question from a list of questions
function getRandomQuestion(questions) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

// Example usage
const questions = [
    "What is the capital of France?",
    "What is 2 + 2?",
    "Who wrote 'To Kill a Mockingbird'?",
    "What is the boiling point of water?"
];

console.log(getRandomQuestion(questions));

module.exports = {
    getRandomQuestion
};