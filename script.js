let questions = [
    {
        question: 'Wofür steht HTML?',
        answer1: 'Home Tool Markup Language',
        answer2: 'Hyperlinks and Text Markup Language',
        answer3: 'Hyper Text Marker Language',
        answer4: 'Hyper Text Markup Language',
        correctAnswer: 4
    },

    {
        question: 'Wer hat HTML erfunden?',
        answer1: 'Home Tool Markup Language',
        answer2: 'Hyperlinks and Text Markup Language',
        answer3: 'Hyper Text Marker Language',
        answer4: 'Hyper Text Markup Language',
        correctAnswer: 4
    },

    {
        question: 'Wie bindet man eine Website in eine Webite ein?',
        answer1: 'Home Tool Markup Language',
        answer2: 'Hyperlinks and Text Markup Language',
        answer3: 'Hyper Text Marker Language',
        answer4: 'Hyper Text Markup Language',
        correctAnswer: 4
    }
]

let currentQuestion = 0;
let correctAnswers = 0;

function init() {
    renderNumberOfQuestions();
    showQuestion();
}

function renderNumberOfQuestions() {
    const numberOfQuestions = document.getElementById('numberOfQuestions');
    numberOfQuestions.innerHTML = questions.length;
}

function showQuestion() {
    const currentQuestionNumber = document.getElementById('currentQuestion');
    const question = document.getElementById('question');

    currentQuestionNumber.innerHTML = currentQuestion + 1;
    question.innerHTML = `${questions[currentQuestion]['question']}`;

    for (let i = 1; i < 5; i++) { // Schleife wird für jede Antwort durchlaufen
        const answer = document.getElementById(`answer${i}`);
        answer.classList.remove('bg-success');
        answer.classList.remove('bg-danger');
        answer.innerHTML = `${questions[currentQuestion][`answer${i}`]}`;
    }
}

function showResults() {
    const quizCard = document.getElementById('quizCard');
    const resultsCard = document.getElementById('resultsCard');
    const result = document.getElementById('result');

    quizCard.classList.add('dNone');
    resultsCard.classList.remove('dNone');

    result.innerHTML = resultHTML();
}

function checkAnswer(selectedAnswerIndex) {
    const selectedAnswer = document.getElementById(`answer${selectedAnswerIndex}`);
    const correctAnswerIndex = questions[currentQuestion]['correctAnswer'];
    const correctAnswer = document.getElementById(`answer${correctAnswerIndex}`);
    const btn = document.getElementById('nextQuestionBtn');

    if (selectedAnswerIndex != correctAnswerIndex) {
        selectedAnswer.classList.add('bg-danger');
    } else {
        correctAnswers++;
    }
    correctAnswer.classList.add('bg-success');
    btn.disabled = false;
}

function nextQuestion() {
    const btn = document.getElementById('nextQuestionBtn');

    currentQuestion++;
    if (currentQuestion < questions.length) {
        btn.disabled = true;
        showQuestion();
    } else {
        showResults();
    }
}

function resultHTML() {
    return /* html */ `
        ${correctAnswers} / ${questions.length}
    `;
}