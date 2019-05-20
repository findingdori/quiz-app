'use strict';

/* Template Generators */
/*  Returns HTML to create Start Page.
    Dependancy: getAssets Function  */
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

/*  Returns HTML for radio button and label for answer option.   */
function generateAnswerItem(answer, index) {
    return `<label for="${index}">
        <input type="radio" id="${index}" name="questions" value="${answer}" required>
        ${answer}
    </label>`;
}

/*  Runs the generateAnswerItem function on each answer in current question object.
    Dependancy: generateAnswerItem */
function generateAnswerList(question) {
    //console.log("Generating answers list");
    const answers = question.answers.map((answer, index) => generateAnswerItem(answer, index));
    return answers.join("");
}

/*  Returns HTML to create Question Page.
    Dependancy: generateAnswerList > generateAnswerItem */
function generateQuestion(currQuestion) {
    //console.log('Generating question');
    const answers = generateAnswerList(currQuestion);

    return `<form class="quiz-app">
        <div class="row question">
            <div class="col-12">
                <fieldset>
                    <legend>${currQuestion.question}</legend>
                    ${answers}
                </fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <button type="submit" class="btnSubmitAnswer">Submit</button>
            </div>
        </div>
    </form>`
}

/*  Returns HTML to create Quiz Status Bar   */
function generateQuizStatus() {
    //console.log('Generating quiz status bar');
    return `<div class="col-12">
        <div class="score">
            <span><strong>Question</strong>: ${STORE.currentQuestion}/${QUESTIONS.length}</span>
            <span><strong>Score</strong>: ${STORE.userScore}/${QUESTIONS.length}</span>
        </div>
    </div>`
}

/*  Returns HTML to show if answer selected was wrong or correct.
    Dependancy: getAssets
                getCorrectAnswer   */
function generateQuestionResult() {
    //console.log(`Generating Question Results`);
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

/*  Return HTML to create the final results page.
    Dependancy: getAssets   */
function generateFinalResult() {
    //console.log(`Generating Final Results`);
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

/*  Returns current asset object   */
function getAssets(assetID) {
    //console.log(`Assets being found`);
    const quizAssets = ASSETS.find(function(asset) {
        return asset.id === assetID;
      });
    return quizAssets;
}

/*  Returned current question object   */
function getCurrentQuestion () {
    //console.log('Getting current question object')
    const questionObject = QUESTIONS.find(function(question) {
        return question.id === STORE.currentQuestion;
      });
    return questionObject;
}

/*  Return array index for current question   */
function getCurrentQuestionIndex () {
    //console.log('Getting current question array index');
    const questionIndex = QUESTIONS.findIndex(function(question) {
        return question.id === STORE.currentQuestion;
      });
    return questionIndex;
}

/*  Return correct answer text
    Dependancy: getCurrentQuestionIndex   */
function getCorrectAnswer() {
    //console.log('Correct answer is being found');
    const questionIndex = getCurrentQuestionIndex();
    const answerIndex = QUESTIONS[questionIndex].correctAnswer;
    const correctAnswerText = QUESTIONS[questionIndex].answers[answerIndex];
    return correctAnswerText;
}

/*  Increase user score */
function updateUserScore() {
    //console.log('Updating user score');
    STORE.userScore++;
}

/*  Checks user answer selected. If correct, increases score. 
    Changes STORE value to indicate if answer is correct or wrong.
    If no answer selected, display alert message.
    Dependancy: getCorrectAnswer
                updateUserScore   */
function checkAnswer() {
    //console.log('Answer is being checked')
    const currentAnswer = $( "input:checked" ).val();
    const correctAnswerText = getCorrectAnswer();
    
    if (currentAnswer === correctAnswerText) {
        STORE.currentAnswer = 'correctAnswer';
        updateUserScore();
    } else {
        STORE.currentAnswer = 'wrongAnswer';
    }    
}

/*  Increase question count    */
function advanceToNextQuestion() {
    //console.log('Question count is increasing')
    STORE.currentQuestion++;
}

/*  Clears value from STORE.currentAnswer */
function clearAnswer() {
    //console.log('Answer is being cleared');
    STORE.currentAnswer = null;
}

/*  Sets STORE to initial values to restart quiz */
function restartQuiz() {
    //console.log('Restarting Quiz');
    STORE.view = 'start';
    STORE.currentQuestion = 1;
    STORE.userScore = 0;
}

/* Rendering Functions */

/*  Appends result from generateStartPage to intro class for Start Page.
    Dependancy: generateStartPage */
function renderStartQuiz() {
    //console.log('Generating start of quiz');
    $('.intro').html(generateStartPage());
}

/*  Appends result from generate question to quiz class for Question page.
    Dependancy: getCurrentQuestion
                generateQuestion    */
function renderQuestionText() {
    //console.log('Rendering question');
    const currQuestion = getCurrentQuestion();
    $('.quiz').html(generateQuestion(currQuestion));
}

/*  Appends result from generateQuizStatus to quizStatus class for Quiz Status Bar.
    Dependancy: generateQuizStatus */
function renderQuizStatusBar() {
    //console.log('Rendering quiz status bar');
    $('.quizStatus').html(generateQuizStatus());
}

/*  Appends result from generateQuestionResult to result class for Question Results Page.
    Dependancy: generateQuestionResult */
function renderQuestionResult() {
    //console.log('Result is being rendered');
    $('.result').html(generateQuestionResult());
}

/*  Appends result from generateFinalResult to result class for Final Results page.
    Dependancy: generateFinalResult */
function renderFinalResult() {
    //console.log('Final result is being rendered');
    $('.result').html(generateFinalResult());
}

/*  Renders proper page according to STORE.view value.
    Dependancy: renderStartQuiz
                renderQuestionText
                renderQuizStatusBar
                renderQuestionResult
                renderFinalResult   */
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

/*  Event handler to start quiz when Start button is clicked
Dependancy: render*/
function handleQuizStart() {
    //console.log('Handling start quiz process');
    $('.intro').on('click', '.btnStartQuiz', function(event) {
        //console.log('Quiz has started');
        STORE.view = 'quiz';
        render();
    });
}

/*  Event handler to handle answer submitted when submit button is clicked 
    Dependancy: checkAnswer
                render */
function handleAnswerSubmitted() {
    //console.log('Handling submit answer process');
    $('.quiz').on('submit', function (event) {
        event.preventDefault();
        //console.log('Answer has been submitted');
        checkAnswer();
        STORE.view = 'questionResult';
        render();
    });
}

/*  Event handler to handle next question button clicked on question results page
    Dependancy: clearAnswer
                advanceToNextQuestion
                render  */
function handleNextQuestion() {
    //console.log('Handling next question process');
    $('.result').on('click', '.btnNextQuestion', function(event) {
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

/*  Event handler to handle when restart quiz button is clicked on final results page
    Dependancy: restartQuiz
    render  */
function handleRestartQuiz() {
    //console.log('Handling restart quiz process');
    $('.result').on('click', '.btnRestartQuiz', function(event) {
        restartQuiz();
        render();
    });
}

/*  Will run when page is initialized to render page and start event listeners
    Dependancy: handleQuizStart
    handleAnswerSubmitted
    handleNextQuestion
    handleRestartQuiz
    render  */
function initializePage() {
    //Event Listeners
    handleQuizStart();
    handleAnswerSubmitted();
    handleNextQuestion();
    handleRestartQuiz();

    //Render Function
    render();    
}

//Run on page initialize
$(initializePage());