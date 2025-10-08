from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)  # allows frontend (HTML) to call backend APIs

# File to store questions
QUESTIONS_FILE = "questions.json"

# Create file if it doesn’t exist
if not os.path.exists(QUESTIONS_FILE):
    with open(QUESTIONS_FILE, "w") as f:
        json.dump([], f)

# --- Route to add questions ---
@app.route("/questions", methods=["POST"])
def add_question():
    data = request.get_json()

    # Validate input
    if not data or "question" not in data or "options" not in data:
        return jsonify({"error": "Invalid data"}), 400

    # Load current questions
    with open(QUESTIONS_FILE, "r") as f:
        questions = json.load(f)

    # Create new question entry
    new_question = {
        "id": len(questions) + 1,
        "question": data["question"],
        "options": data["options"]
    }

    # Save to file
    questions.append(new_question)
    with open(QUESTIONS_FILE, "w") as f:
        json.dump(questions, f, indent=2)

    return jsonify({"message": "Question added successfully", "id": new_question["id"]}), 201


# --- Route to get all questions ---
@app.route("/questions", methods=["GET"])
def get_questions():
    with open(QUESTIONS_FILE, "r") as f:
        questions = json.load(f)
    return jsonify(questions), 200


# --- Home Route (for testing) ---
@app.route("/")
def home():
    return "<h2>✅ Flask Server Running - Online Exam Portal</h2>"

if __name__ == "__main__":
    app.run(debug=True)
