

# 💬 Light Chatbot

A simple chatbot web app built with **Flask (Python)** for the backend and **HTML/CSS/JavaScript** for the frontend.
The backend connects to **Google Gemini API** (or any other LLM API you configure) to generate responses.

---

## 📂 Project Structure

```
chatbot-project/
│── app.py                # Flask backend
│── requirements.txt       # Python dependencies
│── templates/
│   └── index.html         # Chatbot frontend
│── static/
│   ├── style.css          # Chatbot styles
│   └── main.js            # Chatbot logic (frontend JS)
```

---

## ⚙️ Setup Instructions

### 1. Clone or Download

```bash
git clone https://github.com/yourusername/chatbot-project.git
cd chatbot-project
```

### 2. Create a Virtual Environment (optional but recommended)

```bash
python -m venv venv
source venv/bin/activate   # On Mac/Linux
venv\Scripts\activate      # On Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

**`requirements.txt` should contain:**

```
flask
flask-cors
requests
```

### 4. Add Your API Key

Open `app.py` and replace:

```python
API_KEY = "YOUR_GEMINI_API_KEY"
```

with your real [Google Gemini API key](https://ai.google.dev/).

---

## ▶️ Running the App

1. Start Flask:

   ```bash
   python app.py
   ```

2. Open your browser at:

   ```
   http://127.0.0.1:5000/
   ```

3. Type a message in the chatbot input and press **Enter** or click **Send**.
   The backend will send your text to Gemini API and return a response.

---

## 🧪 Testing Without Gemini (Echo Mode)

If you don’t want to set up an API key yet, you can make the chatbot **echo back your message** for testing.

Replace the `/chat` route in `app.py` with:

```python
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    return jsonify({"reply": f"Echo: {user_message}"})
```

Now when you run the app, the chatbot will reply with **Echo: ...** confirming frontend ↔ backend works.

---

## 🛠️ Common Issues

* **JS not sending messages** → Ensure `<form>` does not have `action="#"`. Use the corrected `index.html`.
* **No reply / stuck on “Just a sec..”** → Check your browser console (F12 → Console) for errors.
* **API errors** → Verify your Gemini API key is valid and you have access enabled.
* **Cache issues** → Do a hard reload (Ctrl+Shift+R) after making JS changes.

---

## 🌐 Deployment (Optional)

* You can deploy the Flask app on **Render, Railway, or Heroku**.
* For production, set `debug=False` in `app.py`.
* If deploying frontend separately (e.g., GitHub Pages), update `fetch("/chat",...)` in `main.js` to your backend URL.

---

## 🎉 You’re Done!

You now have a working chatbot with a modern frontend + Python backend.

---

