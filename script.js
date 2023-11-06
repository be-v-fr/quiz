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
    currentQuestion = 0;
    correctAnswers = 0;

    renderNumberOfQuestions();
    renderQuestion();
}

function renderNumberOfQuestions() {
    const numberOfQuestions = document.getElementById('numberOfQuestions');
    numberOfQuestions.innerHTML = questions.length;
}

function renderQuestion() {
    const question = document.getElementById('question');
    question.innerHTML = `${questions[currentQuestion]['question']}`;

    disableNextQuestionBtn(true);
    renderCurrentQuestionNumber();
    renderProgressBar();
    renderAnswers();
}

function renderCurrentQuestionNumber() {
    const currentQuestionNumber = document.getElementById('currentQuestion');
    currentQuestionNumber.innerHTML = currentQuestion + 1;
}

function renderProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const widthPercent = currentQuestion / questions.length * 100;

    progressBar.style.width = `${widthPercent}%`;
}

function renderAnswers() {
    for (let i = 1; i < 5; i++) { // Schleife wird für jede Antwort durchlaufen
        renderAnswer(i);
    }
}

function renderAnswer(answerIndex) {
    const answer = document.getElementById(`answer${answerIndex}`);
    answer.classList.remove('bg-success');
    answer.classList.remove('bg-danger');
    answer.innerHTML = `${questions[currentQuestion][`answer${answerIndex}`]}`;
}

function renderResults() {
    const quizCard = document.getElementById('quizCard');
    const resultsCard = document.getElementById('resultsCard');
    const result = document.getElementById('result');

    quizCard.classList.add('dNone');
    resultsCard.classList.remove('dNone');

    playAudio('endscreenAudio');
    result.innerHTML = resultHTML();
}

function disableNextQuestionBtn(disabled) {
    const btn = document.getElementById('nextQuestionBtn');
    btn.disabled = disabled;
}

function checkAnswer(selectedAnswerIndex) {
    const selectedAnswer = document.getElementById(`answer${selectedAnswerIndex}`);
    const correctAnswerIndex = questions[currentQuestion]['correctAnswer'];
    const correctAnswer = document.getElementById(`answer${correctAnswerIndex}`);

    if (wrongAnswer(selectedAnswerIndex, correctAnswerIndex)) {
        selectedAnswer.classList.add('bg-danger');
        playAudio('wrongAnswerAudio');
    } else {
        correctAnswers++;
        playAudio('correctAnswerAudio');
    }
    correctAnswer.classList.add('bg-success');
    disableNextQuestionBtn(false);
}

function wrongAnswer(selectedAnswer, correctAnswer) {
    return selectedAnswer != correctAnswer;
}

function nextQuestion() {
    currentQuestion++;
    if (quizNotOver()) {
        renderQuestion();
    } else {
        renderResults();
    }
}

function quizNotOver() {
    return currentQuestion < questions.length;
}

function restartGame() {
    const quizCard = document.getElementById('quizCard');
    const resultsCard = document.getElementById('resultsCard');

    init();

    quizCard.classList.remove('dNone');
    resultsCard.classList.add('dNone');
}

function playAudio(id) {
    const audioElement = document.getElementById(`${id}`);
    audioElement.play();
}

function resultHTML() {
    return /* html */ `
        ${correctAnswers} / ${questions.length}
    `;
}