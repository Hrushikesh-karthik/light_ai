from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

API_KEY = "AIzaSyAVxUqDeqzLJCCcetLVqqyk6O8FaLOcEGA"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"

# Home route → serves your chatbot HTML
@app.route("/")
def index():
    return render_template("index.html")

# Chat API route
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        response = requests.post(
            GEMINI_API_URL,
            headers={"Content-Type": "application/json"},
            json={"contents": [{"role": "user", "parts": [{"text": user_message}]}]}
        )

        response.raise_for_status()
        model_response = response.json()

        bot_reply = model_response["candidates"][0]["content"]["parts"][0]["text"]

        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
