// all these yamayama code is for getting our questions form the array. I would love to call it an API but I dont think thats cool for now.
const question = document.getElementById("question");
// we converted the choice function to an array by adding "Array.from(....)". We did this so that we can us some array functions on it ....
const choice = Array.from(document.getElementsByClassName("choice-text"));
// for displaying the score and stage dinamically we target the id we gave them in tht html tag

const progressText = document.getElementById("progressText");
const marks = document.getElementById("scores");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
// we are creating acceptinganswer in other to create a delay, so that when someone answer a question it delays for so e seconfs before loading another answer
let acceptingAnswer = true;  
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];
 const theQuestions = "http://127.0.0.1:5500/question.json";
//  fetch(theQuestions).then((response)=>  {
//     console.log(response);
//     return response.json();
//   });
fetch(theQuestions)
  .then((res) => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  })
  .catch(err => {
    console.error(err);
  });
// constants
const  CORRECT_BONUS = 10;
const MAX_QUESTION = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    // the three dots is called a spread operator which means, take [...question] the array question, spread out each of its item and save it into another array.
    // console.log(availableQuestion);
    getNewQuestion();
};
getNewQuestion = () => {
    if(availableQuestion.lenght === 0 || questionCounter >= MAX_QUESTION ) {
        localStorage.setItem("mostRecentScore", score);
        // go to the end page

     return window.location.assign("/end.html");  
     
    }
    questionCounter++;
    // so we update the stage here which counts the number of questions we have answered and the one left. using string concatination method
    // progressText.innerText ="Question" + " " + questionCounter + "/" + MAX_QUESTION;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;
    // now we update the progress bar
    // const prog = (questionCounter / MAX_QUESTION) * 100;
     
    
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;
    
    
    
    // another way is using ES6 method
    // stage.innerText = '${questionCounter}/${MAX_QUESTION}';

   const questionIndex = Math.floor(Math.random() * availableQuestion.length);
   
//    got to give a reference to the current question by getting it out of the availableQuestion array and then use our question index. ie, the question index will get random questions from the available question array and then store it in thencurrentQuestion. 
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
        // animation on correct and incorrect question
        // const classToAplly = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer){
        //    classToAplly = 'correct';
        // }
        // or
        // if(selectedAnswer == currentQuestion.answer){
        //     console.log('You are correct');
        // }
        // else{
        //     console.log('You are wrong');
        // }
        // or
        const classToAplly = selectedAnswer 
        == currentQuestion.answer ? 'correct' : 'incorrect'; 
        if(classToAplly === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
       else if(classToAplly !== 'correct') {
        decreaseScore(CORRECT_BONUS);
       }
    //    if(availableQuestion.length === MAX_QUESTION ){
    //        alert(totallScore);
    //    }

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
// totallScore = scr => {
//     tot = incrementScore + decreaseScore;
//     marks.innerText = tot; 
// };



