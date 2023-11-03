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

function init() {
    renderQuestion(0);
}

function renderQuestion() {
    const question = document.getElementById('question');
    question.innerHTML = `${questions[currentQuestion]['question']}`;

    for (let i = 1; i < 5; i++) {
        const answer = document.getElementById(`answer${i}`);
        answer.classList.remove('bg-success');
        answer.classList.remove('bg-danger');
        answer.innerHTML = `${questions[currentQuestion][`answer${i}`]}`;
    }
}

function checkAnswer(selectedAnswerIndex) {
    const selectedAnswer = document.getElementById(`answer${selectedAnswerIndex}`);
    const correctAnswerIndex = questions[currentQuestion]['correctAnswer'];
    const correctAnswer = document.getElementById(`answer${correctAnswerIndex}`);
    if (selectedAnswerIndex != correctAnswerIndex) {
        selectedAnswer.classList.add('bg-danger');
    }
    correctAnswer.classList.add('bg-success');
}