"""
This script runs the application using a development server.
It contains the definition of routes and views for the application.
"""
import json
from Functions.caesar_functions import encipherCaesar, decipherCaesar, breakCaesarShift
from Functions.vigenere_functions import encipherVigenere, decipherVigenere
from flask import request, Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Make the WSGI interface available at the top level so wfastcgi can get it.
wsgi_app = app.wsgi_app


@app.route('/')
def hello():
    """Renders a sample page."""
    return "Hello World!"

@app.post('/encipherCaesar')
def encipherCaesarShift():
    """
    Enciphers a message using the caesar shift cipher
    """
    
    response = jsonify(encipherCaesar(request.get_json()['message'], int(request.get_json()['key'])))
    return response

@app.post('/decipherCaesar')
def decipherCaesarShift():
    """
    Deciphers ciphertext using the caesar shift cipher
    """
    
    response = jsonify(decipherCaesar(request.get_json()['message'], int(request.get_json()['key'])))
    return response

@app.post('/breakCaesar')
def breakCaesarCipher():
    """
    Breaks a ceaser shift cipher using frequency analysis
    """        
    
    response = jsonify(breakCaesarShift(request.get_json()['message']))
    return response

@app.post('/encipherVigenere')
def encipherVigenereCipher():
    """
    Enciphers plaintext using the Vigenere's cipher
    """
    
    response = jsonify(encipherVigenere(request.get_json()['message'], request.get_json()['key']))
    return response

@app.post('/decipherVigenere')
def decipherVigenerCipehr():
    """
    Deciphers ciphertext using the Vigenere's cipher
    """

    response = jsonify(decipherVigenere(request.get_json()['message'], request.get_json()['key']))
    return response

if __name__ == '__main__':
    import os
    HOST = os.environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555
    app.run(HOST, PORT)
