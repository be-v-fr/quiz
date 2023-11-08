let questions = [];
let currentQuestion = 0;
let correctAnswers = 0;
let disabledAnswers = false; // dient zur Kontrolle, ob Frage bereits beantwortet wurde
let disabledNav = true;

function init() {
    renderProgressBar();
}

function showScreen(idNumber) {
    for (i = 1; i < 5; i++) {
        const screen = document.getElementById(`screen${i}`);
        if (i == idNumber) { // Screen #'idNumber' anzeigen
            screen.classList.remove('dNone');
        } else { // Screen verbergen
            screen.classList.add('dNone');
        }
    }
}

function showSelectQuizMenu() {
    reset();
    showScreen(2);
}

function reset() {
    currentQuestion = 0;
    correctAnswers = 0;
    disabledAnswers = false;
    activateNav(false);
    positionSelectedQuizLine(0); // Entfernung der Nav-Markierungen
    renderProgressBar();
}

function startQuiz(quizIndex) {
    reset()
    showScreen(3);
    positionSelectedQuizLine(quizIndex);
    setQuestionsArray(quizIndex);
    renderNumberOfQuestions();
    renderQuestion();
    activateNav(true);
}

function activateNav(activated) {
    const nav = document.getElementById('nav');
    if(activated) {
        disabledNav = false;
        nav.classList.remove('navInactive');
    } else {
        disabledNav = true;
        nav.classList.add('navInactive');
    }
}

function navSelectQuiz(quizIndex) {
    if (!disabledNav) {
        if (currentQuestion > 0) { // Bestätigung per Dialog, falls bereits Fragen beantwortet wurden
            showDialogue(leaveQuizHTML());
        } else { // sonst ohne Dialog neues Quiz starten
            startQuiz(quizIndex);
        }
    }
}

function showDialogue(message) {
    document.getElementById('dialogueWrapper').classList.remove('dNone');
    document.getElementById('dialogueMessage').innerHTML = `${message}`;
}
function hideDialogue() {
    document.getElementById('dialogueWrapper').classList.add('dNone');
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
    const answerContent = document.getElementById(`answer${answerIndex}Content`);
    answer.classList.remove('bg-success');
    answer.classList.remove('bg-danger');
    answerContent.innerHTML = `${questions[currentQuestion][`answer${answerIndex}`]}`;
}

function positionSelectedQuizLine(navIndex) {
    for (i = 1; i < 4; i++) {
        document.querySelector(`#nav :nth-child(${i})`).style = 'border-color: rgba(0,0,0,0)';
    }
    if (navIndex != 0) { // für den Wert 0 werden die Markierungen nur entfernt
        document.querySelector(`#nav :nth-child(${navIndex})`).style = 'border-color: white';
    }
}

function setQuestionsArray(quizIndex) {
    if (quizIndex == 1) {
        questions = questionsHTML;
    }
    if (quizIndex == 2) {
        questions = questionsCSS;
    }
    if (quizIndex == 3) {
        questions = questionsJS;
    }
}

function checkAnswer(selectedAnswerIndex) {
    const selectedAnswer = document.getElementById(`answer${selectedAnswerIndex}`);
    const correctAnswerIndex = questions[currentQuestion]['correctAnswer'];
    const correctAnswer = document.getElementById(`answer${correctAnswerIndex}`);

    if (!disabledAnswers) {
        if (!wrongAnswer(selectedAnswerIndex, correctAnswerIndex)) {
            correctAnswers++;
        }
        answerColorAndSound(selectedAnswerIndex, selectedAnswer, correctAnswerIndex, correctAnswer);
        disableNextQuestionBtn(false);
        disableAnswers(true);
    }
}

function answerColorAndSound(selectedIndex, selected, correctIndex, correct) {
    if (wrongAnswer(selectedIndex, correctIndex)) {
        selected.classList.add('bg-danger');
        playAudio('wrongAnswerAudio');
    } else {
        playAudio('correctAnswerAudio');
    }
    correct.classList.add('bg-success');
}

function wrongAnswer(selected, correct) {
    return selected != correct;
}

function disableNextQuestionBtn(disabled) {
    const btn = document.getElementById('nextQuestionBtn');
    btn.disabled = disabled;
}

function disableAnswers(disable) {
    disabledAnswers = disable; // globale Variable setzen
    for (let i = 1; i < 5; i++) { // Schleife wird für jede Antwort durchlaufen
        disableAnswer(i);
    }
}

function disableAnswer(answerIndex) {
    const answer = document.getElementById(`answer${answerIndex}`);
    if (disabledAnswers) {
        answer.classList.add('quizAnswerCardDisabled');
    } else {
        answer.classList.remove('quizAnswerCardDisabled');
    }
}

function nextQuestion() {
    currentQuestion++;
    disableAnswers(false);
    renderProgressBar();
    if (quizNotOver()) {
        renderQuestion();
    } else {
        renderResults();
    }
}

function quizNotOver() {
    return currentQuestion < questions.length;
}

function playAudio(id) {
    const audioElement = document.getElementById(`${id}`);
    audioElement.play();
}

function renderResults() {
    const result = document.getElementById('result');
    showScreen(4);
    result.innerHTML = resultHTML();
    playAudio('endscreenAudio');
}

function resultHTML() {
    return /* html */ `
        ${correctAnswers} / ${questions.length}
    `;
}

function leaveQuizHTML(quizIndex) {
    return /* html */ `
        Willst du wirklich das aktuelle Quiz verlassen?
        <div class="dialogueBtnContainer">
            <button onclick="startQuiz(${quizIndex})" class="btn btn-primary">ja</button>
            <button onclick="hideDialogue()" class="btn btn-primary">nein</button>
        </div>
    `;
}