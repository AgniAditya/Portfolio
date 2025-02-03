from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)

# Allow cross-origin requests
CORS(app, origins=["http://127.0.0.1:5501"])  # Allow only requests from this domain


@app.route('/')
def home():
    return "Hello, this is your Flask server!"

def process_command(command):
    msg = [{'role':'user','content':command}]
    response = ollama.chat(model='cheetah',messages=msg)
    return response['message']['content']

# Route to handle the chat input
@app.route('/send_message', methods=['POST'])
def send_message():
    # Get the input from the request
    user_input = request.json.get('user_input')

    # Process the user input (for example, print it or do something with it)
    response = process_command(user_input)

    # Respond with a simple JSON (could be more complex in a real application)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)