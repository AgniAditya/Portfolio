function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    // If the user input is not empty
    if (userInput.trim() !== "") {
        
        // // Clear the input field
        // document.getElementById('user-input').value = "";
        
        // // Scroll to the bottom of the chatbox
        // const chatboxBody = document.getElementById('chatbox-body');
        // chatboxBody.scrollTop = chatboxBody.scrollHeight;
        
        // Display the user's message
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.textContent = userInput;
        document.getElementById('chatbox-body').appendChild(userMessage);
        
        // Clear the input field
        document.getElementById('user-input').value = "";
        
        fetch('http://127.0.0.1:5000/send_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_input: userInput,
            }),
        })
        .then(response => response.json())
        .then(data => {
        // Log the response from the Python server (you can display it in the chatbox)
        console.log(data.response);

        // Display the bot's response in the chatbox
        // const botMessage = document.createElement('div');
        // botMessage.classList.add('message', 'bot');
        // botMessage.textContent = data.response;
        // document.getElementById('chatbox-body').appendChild(botMessage);


        // Scroll to the bottom of the chatbox
        const chatboxBody = document.getElementById('chatbox-body');
        chatboxBody.scrollTop = chatboxBody.scrollHeight;
        // Simulate a bot reply after a delay (for demonstration purposes)
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot');
            botMessage.textContent = data.response;
            document.getElementById('chatbox-body').appendChild(botMessage);

            // Scroll to the bottom again
            chatboxBody.scrollTop = chatboxBody.scrollHeight;
        }, 1000); // 1 second delay for the bot reply
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }
}

document.getElementById('user-input').addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
    event.preventDefault();  // Prevent default action (e.g., form submission)
    sendMessage();  // Call the sendMessage function
    }
});

function closeChatbox() {
    const chatbox = document.querySelector('.chatbox');
    const chatbtn = document.querySelector('.myCheetahbotbtn');
    chatbox.style.display = 'none'; // Hides the chatbox
    chatbtn.style.display = 'block'; // Hides the chatbox
}

function openChatbot(){
    const chatbox = document.querySelector('.chatbox');
    const chatbtn = document.querySelector('.myCheetahbotbtn');
    chatbox.style.display = 'flex'; 
    chatbtn.style.display = 'none'; 
}