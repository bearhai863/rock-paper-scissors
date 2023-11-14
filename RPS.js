const score = JSON.parse(localStorage.getItem('score')) || 
{
  wins: 0,
  losses: 0,
  ties: 0
}

displayScore(score);


function playGame(playerMove){
  const randomNum = Math.floor(Math.random() * 3) + 1;

  const computerMove = (randomNum === 1) ? 'rock' : (randomNum === 2) ? 'paper' : 'scissors';

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

function reset_Score(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('score');
  displayScore(score);

}