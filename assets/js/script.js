

const rickButton = document.getElementById("rick");
const mortyButton = document.getElementById("morty");
const imgElement = document.getElementById("img");
const question = document.getElementById("question");
const playGameBtn = document.querySelector(".play");
const highScoreGameBtn = document.querySelector(".high-score");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


window.addEventListener('load', () => {


    rickButton.addEventListener("click", function () {
        imgElement.src = "assets/images/rick.png";
        imgElement.alt = "Rick";
        playGameBtn.classList.remove("hidden");
        highScoreGameBtn.classList.remove("hidden");
    });

    mortyButton.addEventListener("click", function () {
        imgElement.src = "assets/images/Morty_Smith.png";
        imgElement.alt = "Morty";
        playGameBtn.classList.remove("hidden");
        highScoreGameBtn.classList.remove("hidden");

    });


    document.getElementById("rick").addEventListener("click", function () {
        var audio = new Audio("assets/sounds/good-idea-101soundboards.mp3");
        audio.play();

    });
    document.getElementById("morty").addEventListener("click", function () {
        var audio = new Audio("assets/sounds/oh-thats-flattering-101soundboards.mp3");
        audio.play();

    });

});

let questions = [];

fetch("questions.json")
.then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
})
.catch(err => {
console.log (err);
});

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion();
};
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to end page
        return window.location.assign("/end.html");
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';


         if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
         }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});


incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};


