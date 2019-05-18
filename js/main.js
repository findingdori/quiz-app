'use strict';

/* Template Generators */
function generateStartPage() {
    const assets = getAssets('startPage');
    return `<div class="row">
        <div class="col-6">
            <img src="${assets.startImg}" alt="${assets.startImg}">
        </div>
        <div class="col-6">
            <p>${assets.startMsg}</p>
            <button type="button" class="btnStartQuiz">Begin Quiz</button>
        </div>
    </div>`;
}

function generateAnswerItem(answer, index) {
    return `<label for="${index}">
        <input type="radio" id="${index}" name="questions" value="${answer}" required>
        ${answer}
    </label>`;
}

function generateAnswerList(question) {
    console.log("Generating answers list");
    const answers = question.answers.map((answer, index) => generateAnswerItem(answer, index));
    return answers.join("");
}

function generateQuestion(currQuestion) {
    console.log('Generating question');
    const answers = generateAnswerList(currQuestion);

    return `<div class="row question">
            <div class="col-12">
                <h2>${currQuestion.question}</h2>
                <fieldset>
                    ${answers}
                </fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <button type="submit" class="btnSubmitAnswer">Submit</button>
            </div>
        </div>`
}

function generateQuizStatus() {
    console.log('Generating quiz status bar');
    return `<div class="col-12">
        <div class="score">
            <span><strong>Question</strong>: ${STORE.currentQuestion}/${QUESTIONS.length}</span>
            <span><strong>Score</strong>: ${STORE.userScore}/${QUESTIONS.length}</span>
        </div>
    </div>`
}

function generateQuestionResult() {
    console.log(`Generating Question Results`);
    const resultAssets = getAssets(STORE.currentAnswer);
    const correctAnswerText = getCorrectAnswer();

    return `<div class="row">
        <div class="col-3 empty">&nbsp;</div>
        <div class="col-6">
            <h2>${resultAssets.resultMsg}</h2>
            <img src="${resultAssets.resultImg}" alt="${resultAssets.resultImgAlt}">
        </div>
        <div class="col-3 empty">&nbsp;</div>
    </div>

    ${STORE.currentAnswer === 'wrongAnswer' ? `<div class="row correctAnswer">
        <div class="col-12 ">
            <p>The correct answer was obviously '<strong>${correctAnswerText}</strong>'!</p>
        </div>
    </div>` : ''}

    <div class="row">
        <div class="col-12">
            <button type="button" class="btnNextQuestion">NEXT QUESTION</button>
        </div>
    </div>`
}

function generateFinalResult() {
    console.log(`Generating Final Results`);
    const resultAssets = getAssets('finalResult');
    return `<div class="row">
        <div class="col-4 empty">&nbsp;</div>
        <div class="col-4 finalResult">
            <h2>FINAL SCORE</h2>
            <p><strong>${STORE.userScore}</strong> out of <strong>${QUESTIONS.length}</strong><p>
        </div>
        <div class="col-4 empty">&nbsp;</div>
    </div>
    <div class="row">
        <div class="col-2 empty">&nbsp;</div>
        <div class="col-8">
            <p class="finalResultMsg">${STORE.userScore > (QUESTIONS.length/2) ? `${resultAssets.goodResultMsg}` : `${resultAssets.badResultMsg}`}</p>
        </div>
        <div class="col-2 empty">&nbsp;</div>
    </div>
    <div class="row">
        <div class="col-3 empty">&nbsp;</div>
        <div class="col-6">
        ${STORE.userScore > (QUESTIONS.length/2) ? `<img src="${resultAssets.goodResultImg}" alt="${resultAssets.goodResultImgAlt}">` : `<img src="${resultAssets.badResultImg}" alt="${resultAssets.badResultImgAlt}">`}
        </div>
        <div class="col-3 empty">&nbsp;</div>
    </div>
    <div class="row">
        <div class="col-12">
            <button type="button" class="btnRestartQuiz">PLAY AGAIN</button>
        </div>
    </div>`
}

/* Fetch Functions */
function getAssets(assetID) {
    console.log(`Assets being found`);
    const quizAssets = ASSETS.find(function(asset) {
        return asset.id === assetID;
      });
    return quizAssets;
}

function getCurrentQuestion () {
    console.log('Getting current question object')
    const questionObject = QUESTIONS.find(function(question) {
        return question.id === STORE.currentQuestion;
      });
    return questionObject;
}

function getCurrentQuestionIndex () {
    console.log('Getting current question array index');
    const questionIndex = QUESTIONS.findIndex(function(question) {
        return question.id === STORE.currentQuestion;
      });
    return questionIndex;
}

function getCorrectAnswer() {
    console.log('Correct answer is being found');
    const questionIndex = getCurrentQuestionIndex();
    const answerIndex = QUESTIONS[questionIndex].correctAnswer;
    const correctAnswerText = QUESTIONS[questionIndex].answers[answerIndex];
    return correctAnswerText;
}

function updateUserScore() {
    console.log('Updating user score');
    STORE.userScore++;
}

function checkAnswer() {
    console.log('Answer is being checked')
     const currentAnswer = $( "input:checked" ).val();
     const correctAnswerText = getCorrectAnswer();
     
     if (currentAnswer === correctAnswerText) {
        STORE.currentAnswer = 'correctAnswer';
        updateUserScore();
     } else {
        STORE.currentAnswer = 'wrongAnswer';
     }    
}

function advanceToNextQuestion() {
    console.log('Question count is increasing')
    STORE.currentQuestion++;
}

function clearAnswer() {
    console.log('Answer is being cleared');
    STORE.currentAnswer = null;
}

function restartQuiz() {
    console.log('Restarting Quiz');
    STORE.view = 'start';
    STORE.currentQuestion = 1;
    STORE.userScore = 0;
}

/* Rendering Functions */
function renderStartQuiz() {
    console.log('Generating start of quiz');
    $('.intro').html(generateStartPage());
}

function renderQuestionText() {
    console.log('Rendering question');
    const currQuestion = getCurrentQuestion();
    $('.quiz').html(generateQuestion(currQuestion));
}

function renderQuizStatusBar() {
    console.log('Rendering quiz status bar');
    $('.quizStatus').html(generateQuizStatus());
}

function renderQuestionResult() {
    console.log('Result is being rendered');
    $('.result').html(generateQuestionResult());
}

function renderFinalResult() {
    console.log('Final result is being rendered');
    $('.result').html(generateFinalResult());
}

function render() {
    if (STORE.view === 'start') {
        renderStartQuiz();
        $('.intro').show();
        $('.quiz').hide();
        $('.result').hide();
        $('.quizStatus').hide();
     } else if (STORE.view === 'quiz') {
        renderQuestionText();
        renderQuizStatusBar();
        $('.intro').hide();
        $('.quiz').show();
        $('.result').hide();
        $('.quizStatus').show();
     } else if (STORE.view === 'questionResult') {
        renderQuestionResult();
        renderQuizStatusBar();
        $('.intro').hide();
        $('.quiz').hide();
        $('.result').show();
        $('.quizStatus').show();
     } else if (STORE.view === 'finalResult') {
        renderFinalResult();
        $('.intro').hide();
        $('.quiz').hide();
        $('.result').show();
        $('.quizStatus').hide();
     }
   }

/* Event Handlers */
function handleQuizStart() {
    console.log('Handling start quiz process');
    $('.intro').on('click', '.btnStartQuiz', function(event) {
        event.preventDefault();
        console.log('Quiz has started');
        STORE.view = 'quiz';
        render();
    });
}

function handleAnswerSubmitted() {
    console.log('Handling submit answer process');
    $('.quiz').on('click', '.btnSubmitAnswer', function (event) {
        event.preventDefault();
        console.log('Answer has been submitted');
        checkAnswer();
        STORE.view = 'questionResult';
        render();
    });
}

function handleNextQuestion() {
    console.log('Handling next question process');
    $('.result').on('click', '.btnNextQuestion', function(event) {
        event.preventDefault();
        clearAnswer();
        if (STORE.currentQuestion < QUESTIONS.length) {
            advanceToNextQuestion();
            STORE.view = 'quiz';
        } else {
            STORE.view = 'finalResult';
        }
        render();
        
    });
}

function handleRestartQuiz() {
    console.log('Handling restart quiz process');
    $('.result').on('click', '.btnRestartQuiz', function(event) {
        event.preventDefault();
        restartQuiz();
        render();
    });
}

function initializePage() {
    //Event Listeners
    handleQuizStart();
    handleAnswerSubmitted();
    handleNextQuestion();
    handleRestartQuiz();

    //Render Function
    render();
}

//Try & Catch to catch missing functions
try {
    $(initializePage());
}
catch(error) {
    console.error(error);
}