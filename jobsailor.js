document.getElementById('inputArea').addEventListener('submit', function (e) {
    e.preventDefault();

    var userInput = document.getElementById('userInput').value;
    
    // Append user's message to the chatbox
    var message = document.createElement('p');
    message.textContent = "You: " + userInput;
    document.getElementById('chatbox').appendChild(message);

    // Here you'd typically send the user's message to your chatbot API for processing
    // Once you receive the response, you can append it to the chatbox as well

    // Clear the user's input
    document.getElementById('userInput').value = '';
});