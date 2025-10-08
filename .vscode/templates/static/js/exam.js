document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".container");
  const response = await fetch("/api/questions");
  const questions = await response.json();

  const questionList = document.createElement("div");
  questionList.classList.add("questions");

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      <div class="options">
        ${q.options
          .map(
            (opt) =>
              `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label>`
          )
          .join("")}
      </div>
    `;
    questionList.appendChild(div);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.addEventListener("click", async () => {
    const answers = questions.map((_, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      return selected ? selected.value : null;
    });

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const result = await res.json();
    alert(`You scored ${result.score} / ${result.total}`);
  });

  container.appendChild(questionList);
  container.appendChild(submitBtn);
});
