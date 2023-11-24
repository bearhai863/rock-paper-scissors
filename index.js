const score = JSON.parse(localStorage.getItem('score')) || 
{
  wins: 0,
  losses: 0,
  ties: 0
}

displayScore(score);

function generateMove(){
  const randomNum = Math.floor(Math.random() * 3) + 1;

  const randomMove = (randomNum === 1) ? 'rock' : (randomNum === 2) ? 'paper' : 'scissors';

  return randomMove;
}

function playGame(playerMove){

  const computerMove = generateMove();
  compareMove(playerMove, computerMove);

}

function compareMove(playerMove, computerMove){

  const displayResultEl = document.querySelector(".displayResult");
  const displayMoveEl = document.querySelector(".displayMove");

  if(playerMove === 'rock'){
    if(computerMove === 'rock'){

      displayResultEl.innerHTML = 'Tie.';
      score.ties += 1;

    }else if(computerMove === 'paper'){

      displayResultEl.innerHTML = 'You Lose.';
      score.losses += 1;

    }else{

      displayResultEl.innerHTML = 'You Win.';
      score.wins += 1;

    }

  }else if(playerMove === 'paper'){
    (computerMove === 'rock') ? 
      (displayResultEl.innerHTML = 'You Win.', score.wins += 1) : 

    (computerMove === 'paper') ? 
      (displayResultEl.innerHTML = 'Tie.', score.ties += 1) :

    (computerMove === 'scissors') ? 
      (displayResultEl.innerHTML = 'You Lose.', score.losses += 1) :

    null;

  }else{
    (computerMove === 'rock') ? 
      (displayResultEl.innerHTML = 'You Lose.', score.losses += 1) : 

    (computerMove === 'paper') ? 
      (displayResultEl.innerHTML = 'You Win.', score.wins += 1) :

    (computerMove === 'scissors') ? 
      (displayResultEl.innerHTML = 'Tie.', score.ties += 1) :
      
    null;
  }

  displayMoveEl.innerHTML = `You <img src="${playerMove}-emoji.png"> <img src="${computerMove}-emoji.png"> Computer`;

  localStorage.setItem('score', JSON.stringify(score));
  displayScore(score); //display new score

}

function displayScore(score){

  const displayScoreEl = document.querySelector(".displayScore");

  displayScoreEl.innerHTML =`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetConfirmation(){

  const resetConfirmationEl = document.querySelector(".js-reset-confirmation");

  resetConfirmationEl.classList.remove("hide-message");

  document.querySelector(".yes-confirmation-btn")
  .addEventListener("click", () =>{
    reset_Score();
    resetConfirmationEl.classList.add("hide-message");
  });

  document.querySelector(".no-confirmation-btn")
  .addEventListener("click", () =>{
    resetConfirmationEl.classList.add("hide-message");
  });

}

function reset_Score(){

  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('score');
  displayScore(score);

}


let isAutoPlay = false;
let intervalId;

function autoPlay(){

  if(!isAutoPlay){
    isAutoPlay = true;

    intervalId = setInterval(() => {
      const playerMove = generateMove();
      playGame(playerMove);
    }, 1000);

    autoPlayBtn.innerHTML = 'Stop Playing (a)';

  }else{
    clearInterval(intervalId);
    isAutoPlay = false;
    autoPlayBtn.innerHTML = 'Auto Play (a)';
  }

}


//addEventListener
document.querySelector(".js-rock")
  .addEventListener("click", () => {
    playGame('rock');
  }
);

document.querySelector(".js-paper")
  .addEventListener("click", () => {
    playGame('paper');
  }
);

document.querySelector(".js-scissors")
  .addEventListener("click", () => {
    playGame('scissors');
  }
);

document.body.addEventListener("keydown", (event) => {
  event.key === 'r' ? playGame('rock') :
  event.key === 'p' ? playGame('paper') :
  event.key === 's' ? playGame('scissors') :
  null;
});

const resetBtn = document.querySelector(".reset-score");

resetBtn.addEventListener("click", () =>{
  resetConfirmation();
});

document.body.addEventListener("keydown", (event) =>{
  event.key === 'Backspace' ? resetConfirmation() : null;
});

const autoPlayBtn = document.querySelector(".js-auto-play");

autoPlayBtn.addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  event.key === 'a' ? autoPlay() : null;
});


