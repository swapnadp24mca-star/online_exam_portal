// ------------------- CONFIG -------------------
const API_BASE = "http://localhost:5000"; // Flask backend URL

// ------------------- SIGNUP HANDLER -------------------
async function handleSignup(event) {
  event.preventDefault();

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const roleSelect = document.getElementById("role");
  const rolePage = roleSelect.options[roleSelect.selectedIndex].text.toLowerCase();

  if (!fname || !lname || !phone || !email || !password || !roleSelect.value) {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  const userData = {
    fname,
    lname,
    phone,
    email,
    password,
    role: rolePage
  };

  try {
    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Signup Successful! Please Login.");
      window.location.href = "login.html";
    } else {
      alert("❌ Signup Failed: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Check your backend is running.");
  }
}

// ------------------- LOGIN HANDLER -------------------
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("⚠️ Please fill in both email and password!");
    return;
  }

  const loginData = { email, password };

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Login Successful!");

      if (data.role === "teacher") {
        window.location.href = "teacherdash.html";
      } else if (data.role === "student") {
        window.location.href = "studdash.html";
      } else {
        alert("Unknown role, redirecting to student dashboard.");
        window.location.href = "studdash.html";
      }
    } else {
      alert("❌ Login Failed: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Check your backend is running.");
  }
}

// ------------------- QUESTION CREATION -------------------
async function handleCreateQuestion(event) {
  event.preventDefault();

  const question = document.getElementById("question-input").value.trim();
  const option1 = document.getElementById("option1").value.trim();
  const option2 = document.getElementById("option2").value.trim();
  const option3 = document.getElementById("option3").value.trim();

  if (!question || !option1 || !option2 || !option3) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  const questionData = {
    question,
    options: [option1, option2, option3]
  };

  try {
    const res = await fetch(`${API_BASE}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Question saved successfully! (ID: " + data.id + ")");
      document.getElementById("question-input").value = "";
      document.getElementById("option1").value = "";
      document.getElementById("option2").value = "";
      document.getElementById("option3").value = "";
    } else {
      alert("❌ Failed to save question.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Check your backend.");
  }
}

// ------------------- AUTO ATTACH EVENTS -------------------
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("form.signin-container");
  const loginForm = document.querySelector(".login-box form");
  const saveBtn = document.getElementById("saveBtn");

  if (signupForm) signupForm.addEventListener("submit", handleSignup);
  if (loginForm) loginForm.addEventListener("submit", handleLogin);
  if (saveBtn) saveBtn.addEventListener("click", handleCreateQuestion);
  const API_URL = "http://localhost:5000";

// Signup
function signup(data) {
    return fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json());
}

// Login
function login(data) {
    return fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json());
}

// Get questions
function getQuestions() {
    return fetch(`${API_URL}/questions`)
        .then(res => res.json());
}

// Submit answers
function submitAnswers(data) {
    return fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json());
}

// Get results
function getResults(userId) {
    return fetch(`${API_URL}/results?userId=${userId}`)
        .then(res => res.json());
}

});
