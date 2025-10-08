const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.post("/api/submit", (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] && userAnswers[i].trim() === q.answer.trim()) {
      score++;
    }
  });

  res.json({
    message: "Exam submitted successfully!",
    score: score,
    total: questions.length,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
