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

    return `<div>
        <div class="row question">
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

function render() {
    if (STORE.view === 'start') {
        renderStartQuiz();
        $('.intro').show();
        $('.quiz').hide();
        $('.result').hide();
        $('.quizStatus').hide();
     } else if (STORE.view === 'quiz') {
        renderQuestionText();
        $('.intro').hide();
        $('.quiz').show();
        $('.result').hide();
        $('.quizStatus').show();
     } else if (STORE.view === 'questionResult') {

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

function initializePage() {
    //Event Listeners
    handleQuizStart();

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