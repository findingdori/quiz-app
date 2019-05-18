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

/* Fetch Functions */
function getAssets(assetID) {
    console.log(`Assets being found`);
    const quizAssets = ASSETS.find(function(asset) {
        return asset.id === assetID;
      });
    return quizAssets;
}

/* Rendering Functions */
function renderStartQuiz() {
    console.log('Generating start of quiz');
    $('.intro').html(generateStartPage());
}

function render() {
    if (STORE.view === 'start') {
        renderStartQuiz();
        $('.intro').show();
        $('.quiz').hide();
        $('.result').hide();
        $('.quizStatus').hide();
     } else if (STORE.view === 'quiz') {

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

function initializePage() {
    //Event Listeners

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