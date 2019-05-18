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
    return `<div class="row">
        <div class="col-4 empty">&nbsp;</div>
        <div class="col-4">
            <h2>${STORE.currentAnswer}</h2>
            <img src="img.png" alt="ALT TEXT">
        </div>
        <div class="col-4 empty">&nbsp;</div>
    </div>

    ${STORE.currentAnswer === 'wrongAnswer' ? `<div class="row correctAnswer">
        <div class="col-12 ">
            <p>The correct answer was obviously '<strong>CORRECT ANSWER</strong>'!</p>
        </div>
    </div>` : ''}

    <div class="row">
        <div class="col-12">
            <button type="button" class="btnNextQuestion">NEXT QUESTION</button>
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

function initializePage() {
    //Event Listeners
    handleQuizStart();
    handleAnswerSubmitted();

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