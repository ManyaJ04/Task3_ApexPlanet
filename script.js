
async function getJoke() {
  const res = await fetch('https://official-joke-api.appspot.com/random_joke');
  const data = await res.json();
  document.getElementById('joke-setup').textContent = data.setup;
  document.getElementById('joke-punchline').textContent = data.punchline;
}

const allQuestions = {
  html: [
    { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "HighText Machine Language", "Hyper Tabular Markup Language"], correct: 0 },
    { question: "Who is the inventor of HTML?", answers: ["Tim Berners-Lee", "Brendan Eich", "James Gosling"], correct: 0 },
    { question: "What tag is used for inserting an image in HTML?", answers: ["<image>", "<img>", "<src>"], correct: 1 },
    { question: "Which HTML tag is used for creating a hyperlink?", answers: ["<a>", "<link>", "<href>"], correct: 0 },
    { question: "What tag is used to create a line break?", answers: ["<lb>", "<break>", "<br>"], correct: 2 }
  ],
  css: [
    { question: "Which property is used to change background color?", answers: ["color", "background-color", "bgcolor"], correct: 1 },
    { question: "What does CSS stand for?", answers: ["Cascading Style Sheets", "Creative Style Syntax", "Colorful Style Sheets"], correct: 0 },
    { question: "Which property is used to change text size?", answers: ["text-size", "font-size", "size"], correct: 1 },
    { question: "Which CSS property controls the text color?", answers: ["font-color", "text-color", "color"], correct: 2 },
    { question: "How do you add a comment in CSS?", answers: ["// this is a comment", "/* this is a comment */", "<!-- this is a comment -->"], correct: 1 }
  ],
  js: [
    { question: "What does JS stand for?", answers: ["JavaScript", "JavaSuper", "JustScript"], correct: 0 },
    { question: "Which method is used to print to console?", answers: ["console.print()", "console.write()", "console.log()"], correct: 2 },
    { question: "How do you create a function in JavaScript?", answers: ["function myFunction()", "create myFunction()", "function:myFunction()"], correct: 0 },
    { question: "Which symbol is used for comments in JS?", answers: ["<!-- -->", "//", "/* */"], correct: 1 },
    { question: "Which keyword is used to define a variable?", answers: ["var", "int", "string"], correct: 0 }
  ]
};

let currentQuestion = 0;
let score = 0;
let selectedTopic = 'html';
let questions = allQuestions[selectedTopic];

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz").innerHTML = `
      <h3>Quiz Completed ✅</h3>
      <p>Your score: ${score} out of ${questions.length}</p>
    `;
  }
}

function changeTopic() {
  selectedTopic = document.getElementById("topic").value;
  questions = allQuestions[selectedTopic];
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz").innerHTML = `
    <p id="question"></p>
    <div id="answers"></div>
    <p id="result"></p>
  `;
  loadQuestion();
}

window.onload = () => loadQuestion();
