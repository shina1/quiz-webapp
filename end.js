//what am trying to do here is to disable a button until  users fill all the neccesary fileds
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn" );
const finalScore = document.getElementById(`finalScore`);
const mostRecentScore = localStorage.getItem(`mostRecentScore`);
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

// console.log(highScores);
 
finalScore.innerText = mostRecentScore;


username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
})


saveHighScore = e => {
    console.log("click the save button");
    e.preventDefault();
    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    highScores.push(score);
    highScores.sort( (x,y) => y.score - x.score)
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
   window.location.assign("quiz.html");

};

