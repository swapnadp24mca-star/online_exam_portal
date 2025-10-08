from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

USERS_FILE = "users.json"

# Helper functions to read/write JSON
def load_data(file_path):
    if not os.path.exists(file_path):
        return []
    with open(file_path, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_data(file_path, data):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

# ----------------- ROUTES -----------------
# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    users = load_data(USERS_FILE)

    # Check if email already exists
    for u in users:
        if u['email'] == data['email']:
            return jsonify({"success": False, "message": "Email already registered"}), 400

    users.append(data)
    save_data(USERS_FILE, users)
    return jsonify({"success": True, "message": "Registration successful", "loggedInUser": data}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    users = load_data(USERS_FILE)
    for u in users:
        if u["email"] == data["email"] and u["password"] == data["password"]:
            return jsonify({"success": True, "message": "Login successful", "loggedInUser": u}), 200
    return jsonify({"success": False, "message": "Invalid email or password"}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)

