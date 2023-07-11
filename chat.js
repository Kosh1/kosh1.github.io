const form = document.getElementById('inputArea');
const input = document.getElementById('userInput');
const chatbox = document.getElementById('chatbox');

input.addEventListener('keydown', async function(event) {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        // Prevent the form from trying to submit to a server
        event.preventDefault();

        const userMessage = input.value;

        // Create a new paragraph element and add the user's message
        const userPara = document.createElement('p');
        userPara.textContent = `User: ${userMessage}`;
        chatbox.appendChild(userPara);

        // Clear the input area
        input.value = '';

        // Generate the bot's response (this is where you'd call your chatbot API or function)
        const botMessage = await generateResponse(userMessage);

        // Create a new paragraph element and add the bot's message
        const botPara = document.createElement('p');
        botPara.textContent = `Bot: ${botMessage}`;
        chatbox.appendChild(botPara);
    }
});

async function generateResponse(message) {
    const response = await fetch('http://localhost:5000/check_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'problem': 'Which is greater: 450*65% or 650*45%?', 'answer': message }),
    });

    const data = await response.json();
    return data.correct ? "Correct answer!" : "Incorrect, please try again.";
}
