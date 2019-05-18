'use strict';

const QUESTIONS = [
    {
        id: 1,
        question: `Who is Harley Quinn's best friend?`,
        answers: [
        `Cat Woman`,
        `Bat Girl`,
        `Poison Ivy`,
        `Power Girl`
        ],
        correctAnswer: 2
    },
    {
        id: 2,
        question: `Who was the voice actress of Harley Quinn in Batman: The Animated Series?`,
        answers: [
        `Tara Strong`,
        `Arleen Sorkin`,
        `Mia Sara`,
        `Melissa Rauch`
        ],
        correctAnswer: 1
    },
    {
        id: 3,
        question: `In "Harley's Holiday" who was Harley Quinn with at the Department Store?`,
        answers: [
        `Poison Ivy`,
        `The Joker`,
        `Bud and Lou`,
        `Cat Woman`
        ],
        correctAnswer: 2
    },
    {
        id: 4,
        question: `What is the Joker's presumed legal name in Batman: The Animated Series?`,
        answers: [
        `Jack Napier`,
        `Mr. Joker`,
        `Joe Kerr`,
        `Oberon Sexton`
        ],
        correctAnswer: 0
    },
    {
        id: 5,
        question: `What was Matt Hagen exposed to that caused him to become Clayface?`,
        answers: [
        `Chez Gerard`,
        `Demetrite`,
        `Smylex`,
        `RenuYou`
        ],
        correctAnswer: 3
    },
    {
        id: 6,
        question: `Who was Bruce Wayne's short lived wife?`,
        answers: [
        `Barbara Gordon`,
        `Susan Macguire`,
        `Selina Kyle`,
        `Andrea Beaumont`
        ],
        correctAnswer: 1
    },
    {
        id: 7,
        question: `Who caused Harvey Dent to become the villain Two-Face?`,
        answers: [
        `Rachel Dawes`,
        `Rupert Thorne`,
        `The Batman`,
        `The Joker`
        ],
        correctAnswer: 1
    },
    {
        id: 8,
        question: `What did Matt Hagen do for a living before he became Clayface?`,
        answers: [
        `Actor`,
        `District Attorney`,
        `Psychiatrist`,
        `Reporter`
        ],
        correctAnswer: 0
    },
    {
        id: 9,
        question: `Are Harley Quinn's pet hyenas housebroken?`,
        answers: [
        `Yes`,
        `No`,
        `It was never mentioned`,
        `The hyenas were not in this series`
        ],
        correctAnswer: 0
    },
    {
        id: 10,
        question: `What is everyone in town talking about?`,
        answers: [
        `Your Cat`,
        `Your Dog`,
        `Your Fish`,
        `Your Hyenas`
        ],
        correctAnswer: 2
    }
];

const ASSETS = [
    {
        id: 'startPage',
        startImg: `img/start.jpg`,
        startImgAlt: `Head shot of The Joker holding up a Joker playing card`,
        startMsg: `You think you know everything there is to know about Batman: The Animated Series? Oh please. Don't insult me. I deserve, nay, demand, the right to quiz your knowledge.`
    },
    {
        id: 'correctAnswer',
        resultImg : `img/result-question-correct.gif`,
        resultImgAlt: `Animated image of the Joker sitting in a chair slowly tenting his fingers together.`,
        resultMsg: `CONGRATULATIONS<br>
        YOU DIDN'T FAIL... THIS TIME`
    },
    {
        id: 'wrongAnswer',
        resultImg: `img/result-question-wrong.gif`,
        resultImgAlt: `Animated image of the Joker’s face while he is laughing maliciously.`,
        resultMsg: `YOU ARE WRONG!!!!<br>
        HA HA HA HA!`,
    },{
        id: 'finalResult',
        goodResultImg: `img/result-final-good.gif`,
        goodResultImgAlt: `Animated image of the Joker pinching Harley Quinn’s cheek while she says: “Oh Pudding’, you put the ‘fun’ in funeral.”`,
        goodResultMsg: `You put the 'fun' in funeral!`,
        badResultImg: `img/result-final-bad.gif`,
        badResultImgAlt: `Animated image of the Joker while his grin slowly turns into a frown as he bows down. In the background, Harley Quinn is clapping happily.`,
        badResultMsg: `You just toddle off to your mundane meaningless little life.`
    }
]

const STORE = {
    view: 'start',
    currentQuestion: 1,
    userScore: 0,
    currentAnswer: null,
};