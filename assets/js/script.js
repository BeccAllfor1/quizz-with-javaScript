

const rickButton = document.getElementById("rick");
const mortyButton = document.getElementById("morty");
const imgElement = document.getElementById("img");
const question = document.getElementById("question");
const playGameBtn = document.querySelector(".play");
const highScoreGameBtn = document.querySelector(".high-score");
const choices = Array.from(document.getElementsByClassName("choice-text"));
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

let questions = [
    {
        question: "What is the name of Rick's home dimension?",
        choice1: "Dimension C-132",
        choice2: "Dimension C-137",
        choice3: "Dimension C-138",
        choice4: "Dimension C-139",
        answer: 2

    },

    {

        question: "What is Morty's last name?",
        choice1: "Sanchez",
        choice2: "Smith",
        choice3: "Johnson",
        choice4: "Brown",
        answer: 2
    },

    {
        question: "What is the name of Morty's sister?",
        choice1: "Summer",
        choice2: "Jessica",
        choice3: "Beth",
        choice4: " Annie",
        answer: 1
    },

    {
        question: "Which character often says 'I'm Mr. Meeseeks, look at me!'?",
        choice1: "Rick",
        choice2: "Morty",
        choice3: "Mr. Poopybutthole",
        choice4: "Mr. Meeseeks",
        answer: 4
    },

    {
        question: "What is the name of Rick's spaceship?",
        choice1: "The Spaceship",
        choice2: "The Rickship",
        choice3: "The Galaxy Cruiser",
        choice4: "The U.S.S. Squanchy",
        answer: 2
    },
    {
        question: "Who is Morty's long-time crush?",
        choice1: "Jessica",
        choice2: "Summer",
        choice3: "Tammy",
        choice4: "Annie",
        answer: 1
    },
    {
        question: "What kind of creature is Squanchy?",
        choice1: "Human",
        choice2: "Birdperson",
        choice3: "Cat-like alien",
        choice4: "Cyborg",
        answer: 3
    },
    {
        question: "What is the name of Jerry's workplace?",
        choice1: "The Office",
        choice2: "The Galactic Federation",
        choice3: "The Daycare",
        choice4: "The Jerryboree",
        answer: 4
    },

    {
        question: "What is the name of Jerry's workplace?",
        choice1: "The Office",
        choice2: "The Galactic Federation",
        choice3: "The Daycare",
        choice4: "The Jerryboree",
        answer: 3
    },
    {
        question: "What fruit does Rick turn himself into?",
        choice1: "Apple",
        choice2: "Orange",
        choice3: "Pickle",
        choice4: "Banana",
        answer: 3
    },
    {
        question: "Who is Rick's best friend from his past?",
        choice1: " Birdperson",
        choice2: "Squanchy",
        choice3: "Morty",
        choice4: "Jerry",
        answer: 1
    },

    {
        question: "What is the name of Rick's daughter?",
        choice1: "Summer",
        choice2: "Jessica",
        choice3: "Beth",
        choice4: "Tammy",
        answer: 3
    },
    {
        question: "What is the name of the episode where Rick and Morty go inside a homeless man's body?",
        choice1: "Anatomy Park",
        choice2: "The Ricks Must Be Crazy",
        choice3: "Meeseeks and Destroy",
        choice4: "Rick Potion #9",
        answer: 1
    },
    {
        question: "Who voices both Rick and Morty?",
        choice1: "Dan Harmon",
        choice2: "Chris Parnell",
        choice3: "Justin Roiland",
        choice4: " Spencer Grammer",
        answer: 3
    },
    {
        question: "What is the name of the Galactic Federation agent who hunts Rick? ",
        choice1: "Tammy",
        choice2: "Birdperson",
        choice3: "Krombopulos Michael",
        choice4: "Cornvelious Daniel",
        answer: 4

    },
    {
        question: "In which episode does Evil Morty first appear?",
        choice1: " Close Rick-counters of the Rick Kind",
        choice2: "Get Schwifty",
        choice3: "The Wedding Squanchers",
        choice4: " Rick Potion #9",
        answer: 1
        
    },

]

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
        //go to end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
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

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});


startGame();