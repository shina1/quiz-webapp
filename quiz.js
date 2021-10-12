// getting our questions form the array. I would love to call it an API but I dont think thats cool for now.
const question = document.getElementById("question");
const choice = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById("progressText");
const marks = document.getElementById("scores");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswer = true;  
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = []
const theQuestions = "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple";
// const theQuestions = "question.json";
fetch(theQuestions)
  .then((res) => {
    return res.json();
  })
  .then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion =>{
        const formatedQuestion = {
            question: loadedQuestion.question
        }
        const answerChoices = [...loadedQuestion.incorrect_answers]
        formatedQuestion.answer = Math.floor(Math.random() * 3 + 1)
        answerChoices.splice(
            formatedQuestion.answer - 1,
            0,
            loadedQuestion.correct_answer
        )
        answerChoices.forEach((choice, i)=>{
            formatedQuestion['choice' + (i + 1)] = choice;
        });

        return formatedQuestion
    })
    
    startGame();
  })
  .catch(err => {
    console.error(err);
  });
// constants
const  CORRECT_BONUS = 10;
let MAX_QUESTION 
startGame = () => {
    MAX_QUESTION = questions.length;
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    console.log(availableQuestion);
    getNewQuestion();
    game.classList.remove('hidden')
    loader.classList.add('hidden')
};
getNewQuestion = () => {
    if(availableQuestion.length == 0  || questionCounter >= MAX_QUESTION ) {
        localStorage.setItem("mostRecentScore", score);
        // go to the end page

     return window.location.assign("/end.html");  
     
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;
    // now we update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;
    
   const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    
   currentQuestion = availableQuestion[questionIndex];
//     so nowi set the html questions in. i.e i set the html questions to be the current question.
question.innerText = currentQuestion.question;
choice.forEach(choice =>{
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
});
// we need to take the availbale question array and splice out the question we just used. ths will get rid of the question we just used so that it wont apear again.
availableQuestion.splice(questionIndex, 1);

acceptingAnswer = true;
};
choice.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return ; 

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToAplly = selectedAnswer 
        == currentQuestion.answer ? 'correct' : 'incorrect'; 
        if(classToAplly === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
       else if(classToAplly !== 'correct') {
        decreaseScore(CORRECT_BONUS);
       }
        selectedChoice.parentElement.classList.add(classToAplly);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove( classToAplly);
            getNewQuestion();
        }, 1000);   
    });
});
incrementScore = num => {
    score += num;
    marks.innerText = score;
};
decreaseScore = numb => {
    score -= numb;
    marks.innerText = score;
};




