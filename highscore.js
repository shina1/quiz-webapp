const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// i want to add the high scores to the unorderd list in  the html page. that is mapping
highScoreList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} :-- ${score.score}</li>`;}) .join("");
