# 🧠 Mega IQ Test — Verbal Reasoning Edition

An intelligent, interactive verbal IQ test web app designed to emulate standardized testing formats like SAT, GRE, and GMAT. Built using **React** and **Java Spring Boot**, it challenges users on synonyms, antonyms, analogies, and contextual definitions — complete with adaptive scoring, SVG badges, and MongoDB persistence.

## 🚀 Features

- **📝 Timed Challenge Mode** — Countdown timer per question
- **📖 Word Origin Feedback** — Etymology shown after each answer
- **🏅 SVG-Based Badges** — Dynamic score-tier badges (Bronze, Silver, Gold, Genius)
- **☕ Java Spring Boot Back-End** — RESTful API for score and word origin tracking
- **📦 MongoDB Storage** — Stores score history and user data

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verbal IQ Test</title>
  <style>
    body {
      font-family: Georgia, serif;
      background-color: #fcfcfc;
      padding: 2em;
      color: #333;
    }
    .container {
      max-width: 700px;
      margin: auto;
      background: #fff;
      padding: 2em;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 10px;
    }
    h2 {
      font-size: 1.4em;
      margin-bottom: 0.5em;
    }
    .option {
      display: block;
      margin: 0.5em 0;
      padding: 0.6em 1em;
      background-color: #0055a5;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .option:hover {
      background-color: #003e7e;
    }
    #timer {
      font-size: 1.2em;
      color: #d40000;
      margin: 1em 0;
    }
    #etymology {
      margin-top: 1em;
      font-style: italic;
      color: #555;
    }
    #result {
      margin-top: 2em;
      font-weight: bold;
      font-size: 1.2em;
      color: #006600;
    }
    svg {
      margin-top: 1em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 id="prompt">Loading...</h2>
    <div id="timer">⏱️ Time remaining: <span id="time">15</span>s</div>
    <div id="options"></div>
    <div id="etymology"></div>
    <div id="result"></div>
    <div id="badge"></div>
  </div>

  <script>
    const questions = [
      {
        prompt: "Which word is the closest synonym of 'candor'?",
        options: ["Deceit", "Frankness", "Flattery", "Ambiguity"],
        correctIndex: 1,
        difficulty: "Medium",
        etymology: "From Latin *candor*, meaning 'whiteness, purity, openness'."
      },
      {
        prompt: "Select the correct antonym for 'gregarious':",
        options: ["Sociable", "Reserved", "Talkative", "Boisterous"],
        correctIndex: 1,
        difficulty: "Easy",
        etymology: "From Latin *gregarius* meaning 'belonging to a flock'."
      },
      {
        prompt: "Analogies: ARDUOUS is to EASY as...",
        options: ["MASSIVE is to HEAVY", "ELATED is to JOYFUL", "FREQUENT is to RARE", "NEUTRAL is to OBJECTIVE"],
        correctIndex: 2,
        difficulty: "Medium",
        etymology: "From Latin *arduus* meaning 'steep, difficult'."
      },
      {
        prompt: "In context: 'Her _capricious_ nature made planning impossible.' What does 'capricious' mean?",
        options: ["Strategic", "Unpredictable", "Reliable", "Dull"],
        correctIndex: 1,
        difficulty: "Hard",
        etymology: "From Italian *capriccio*, meaning 'whim, sudden change of mind'."
      },
      {
        prompt: "Find the best fit: OBSTINATE most nearly means...",
        options: ["Stubborn", "Thoughtful", "Generous", "Curious"],
        correctIndex: 0,
        difficulty: "Easy",
        etymology: "From Latin *obstinatus*, meaning 'persisting, resolute'."
      }
    ];

    const scores = { Easy: 10, Medium: 20, Hard: 30 };
    let current = 0;
    let score = 0;
    const ceiling = 300;
    let timer;
    const timeLimit = 15;

    function startTimer() {
      let timeLeft = timeLimit;
      document.getElementById("time").innerText = timeLeft;
      timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timer);
          nextQuestion(false);
        }
      }, 1000);
    }

    function renderQuestion() {
      if (current >= questions.length) {
        showResult();
        return;
      }

      const q = questions[current];
      document.getElementById("prompt").innerHTML = `${q.prompt} <br><em>(${q.difficulty})</em>`;
      document.getElementById("options").innerHTML = "";
      document.getElementById("etymology").innerText = "";
      document.getElementById("badge").innerHTML = "";
      document.getElementById("result").innerText = "";
      startTimer();

      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "option";
        btn.onclick = () => {
          clearInterval(timer);
          nextQuestion(i === q.correctIndex);
        };
        document.getElementById("options").appendChild(btn);
      });
    }

    function nextQuestion(isCorrect) {
      const q = questions[current];
      if (isCorrect && score + scores[q.difficulty] <= ceiling) {
        score += scores[q.difficulty];
      }
      document.getElementById("etymology").innerText = q.etymology;
      current++;
      setTimeout

