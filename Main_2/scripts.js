const quizData = [
  {
    question: 'Who created this site?',
    options: ['Anton', 'Maks', 'Arsenij', 'Savelij'],
    answer: 'Arsenij',
  },
  {
    question: 'What do you need to know to build websites?',
    options: ['JS,CSS,HTML', 'Python', 'C++', 'C#'],
    answer: 'JS,CSS,HTML',
  },
  {
    question: 'Where does the site usually pass all the logic?',
    options: ['CSS', 'JS', 'HTML', 'PYTHON'],
    answer: 'JS',
  },
  {
    question: 'What is bootstrap?',
    options: ['File', 'Language', 'Framework', 'variable '],
    answer: 'Framework',
  },
  {
    question: 'Which is the largest ocean on Earth?',
    options: [
      'Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean',
    ],
    answer: 'Pacific Ocean',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Cu', 'Fe'],
    answer: 'Au',
  },
  {
    question: 'What is the name of the site?',
    options: [
      'Quiz', 'Choice', 'Selection', 'Test',
    ],
    answer: 'Quiz',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
    answer: 'Mars',
  },
  {
    question: 'HTML is a programming language?',
    options: [
      'Yes', 'No', '-', '-',
    ],
    answer: 'No',
  },
  {
    question: 'What is the number of this question?',
    options: ['8', '2', '9', '10'],
    answer: '10',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const progressContainer = document.getElementById('progress');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createProgressDots() {
  progressContainer.innerHTML = '';
  for (let i = 0; i < quizData.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    if (i === currentQuestion) {
      dot.classList.add('active');
    }
    progressContainer.appendChild(dot);
  }
}

function updateProgressDots() {
  const dots = document.getElementsByClassName('progress-dot');
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
    if (i === currentQuestion) {
      dots[i].classList.add('active');
    }
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
  updateProgressDots();
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  createProgressDots();
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

createProgressDots();
displayQuestion();