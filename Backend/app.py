from flask import Flask, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route("/")
def cw():
    print("Coursework 1 Work - Terminal")
    return "CW1 APIs"

if __name__ == "__main__":
    app.run(debug=True)
