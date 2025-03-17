const quizData = [
  {
    question: "What's your (or your child's) biggest point of struggle?",
    options: ["Meeting New People", "Worrying about the Unknown", "Controlling Intense Emotions", "Feeling Constantly Tired", "Focusing on Past Events"],
    values: ["Autism", "Anxiety", "Behavioral", "Depression", "Trauma"]
  },
  {
    question: "Which animal do you (or your child) connect with the most?",
    options: ["Bear", "Bunny", "Cat", "Dog", "Monkey"],
    values: ["Depression", "Anxiety", "Trauma", "Autism", "Controversial", "Behavioral"]
  },
  {
    question: "When something goes wrong, how do you (or your child) usually feel or react?",
    options: ["I feel like I need to be by myself and don't want to talk to anyone", "I feel scared and worried something bad will happen", "I try to stay calm, but somethings it's hard to control my feelings", "I feel really sad and don't want to do anything", "I try to stay calm, but sometimes it's hard to control my feelings"],
    values: ["Autism", "Trauma", "Anxiety", "Depression", "Behavioral"]
  },
  {
    question: "How do you (or your child) feel when asked to do something new or different?",
    options: ["I feel really angry because I don't want to do it", "I feel sad or that I don't want to try", "I get nervous and worried that I'll mess up", "I feel like I want to hide or avoid it", "I feel a little unsure but I try to do it"],
    values: ["Behavioral", "Depression", "Trauma", "Autism", "Anxiety"]
  }
];

const teddyResults = {
  "Anxiety": { name: "Brave Bunny", image: "bunny.jpg" },
  "Autism": { name: "Dependable Dog", image: "dog.jpg" },
  "Trauma": { name: "Caring Cat", image: "cat.jpg" },
  "Depression": { name: "Buddy Bear", image: "bear.jpg" },
  "Behavioral": { name: "Mindful Monkey", image: "monkey.jpg" }
};

function buildQuiz() {
  const quizContainer = document.getElementById("quiz");
  quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<h3>${q.question}</h3>`;

    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");

    q.options.forEach((option, optionIndex) => {
      answersDiv.innerHTML += `
        <label>
          <input type="radio" name="question${index}" value="${q.values[optionIndex]}" onchange="updateProgressBar(${index})">
          ${option}
        </label>
      `;
    });

    questionDiv.appendChild(answersDiv);
    quizContainer.appendChild(questionDiv);
  });
}

function enableSubmitButton() {
  const button = document.getElementById("submit");
  const totalQuestions = quizData.length;

  let answered = 0;
  for (let i = 0; i < totalQuestions; i++) {
    if (document.querySelector(`input[name="question${i}"]:checked`)) {
      answered++;
    }
  }

  if (answered === totalQuestions) {
    button.disabled = false;
  }
}

function updateProgressBar(currentQuestionIndex) {
  const progressBar = document.getElementById("progress");
  const totalQuestions = quizData.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;

  enableSubmitButton();
}

function getResult() {
  let answerCounts = { 
    "Anxiety": 0,
    "Autism": 0,
    "Trauma": 0,
    "Depression": 0,
    "Behavioral": 0
  };

  const totalQuestions = quizData.length;

  for (let i = 0; i < totalQuestions; i++) {
    const selected = document.querySelector(`input[name="question${i}"]:checked`);
    if (selected) {
      answerCounts[selected.value]++;
    }
  }

  let highestAnswer = Object.keys(answerCounts).reduce((a, b) => 
    answerCounts[a] > answerCounts[b] ? a : b
  );

  const result = teddyResults[highestAnswer];
  
  // Displaying the result with image and name
  document.getElementById("result").innerHTML = `
    <h2>Your perfect Teddy is: </h2>
    <img src="${result.image}" alt="${result.name}" style="width: 200px; height: auto; border-radius: 8px;">
  `;
}

document.getElementById("submit").addEventListener("click", getResult);
buildQuiz();
